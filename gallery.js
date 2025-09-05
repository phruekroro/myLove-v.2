// gallery.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

// =================================================================
//  สำคัญ! กรุณาใส่ข้อมูล Firebase ของคุณที่นี่
// =================================================================
const firebaseConfig = {
  apiKey: "AIzaSyB5Fs_LyLytWLhXyUv_-hl1Us1XtQVCtBs",
  authDomain: "couple-photo-ce080.firebaseapp.com",
  projectId: "couple-photo-ce080",
  storageBucket: "couple-photo-ce080.appspot.com",
  messagingSenderId: "636387547630",
  appId: "1:636387547630:web:8b8e7e8694a14d39fc16ff"
};

// --- เริ่มการเชื่อมต่อ Firebase ---
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const imagesRef = ref(storage, 'images/');

// --- ดึง Element จาก HTML ---
const viewer = document.querySelector('.gallery-viewer');
const fileInput = document.getElementById('fileInput');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const addBtn = document.getElementById('add-btn');
const deleteBtn = document.getElementById('delete-btn');

// --- ตัวแปรสำหรับจัดการสถานะของแกลเลอรี ---
let allImages = []; // Array สำหรับเก็บข้อมูลรูปภาพ (URL และ Path)
let currentIndex = 0; // Index ของรูปภาพที่แสดงอยู่ตรงกลาง
let touchStartX = 0;

// =================================================================
//  ฟังก์ชันหลัก
// =================================================================

// 1. โหลดรูปทั้งหมดจาก Firebase
async function loadImages() {
    viewer.innerHTML = '<h2>กำลังโหลดรูปภาพ...</h2>';
    try {
        const res = await listAll(imagesRef);
        const imagePromises = res.items.map(async (itemRef) => {
            const url = await getDownloadURL(itemRef);
            return { url: url, path: itemRef.fullPath };
        });

        allImages = await Promise.all(imagePromises);

        if (allImages.length > 0) {
            renderGallery();
        } else {
            viewer.innerHTML = '<h2>ยังไม่มีรูปภาพ<br>กดปุ่ม "เพิ่มรูป" เพื่อเริ่มต้น</h2>';
        }
    } catch (error) {
        console.error("Error loading images:", error);
        viewer.innerHTML = '<h2>เกิดข้อผิดพลาดในการโหลดรูปภาพ</h2>';
    }
}

// 2. แสดงผลแกลเลอรีบนหน้าจอ
function renderGallery() {
    if (allImages.length === 0) {
        viewer.style.transform = `translateX(0px)`; // Reset position
        viewer.innerHTML = '<h2>ยังไม่มีรูปภาพ<br>กดปุ่ม "เพิ่มรูป" เพื่อเริ่มต้น</h2>';
        return
    };

    viewer.innerHTML = ''; // เคลียร์รูปเก่าทิ้ง

    // สร้าง Element ของรูปภาพ
    allImages.forEach((image, index) => {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'gallery-item';
        if (index === currentIndex) {
            itemDiv.classList.add('active'); // รูปที่อยู่ตรงกลางจะมีคลาส active
        }

        const img = document.createElement('img');
        img.src = image.url;
        img.alt = `รูปที่ ${index + 1}`;

        itemDiv.appendChild(img);
        viewer.appendChild(itemDiv);
    });

    // คำนวณตำแหน่งเพื่อเลื่อนรูปภาพ
    const offset = -currentIndex * viewer.offsetWidth;
    viewer.style.transform = `translateX(${offset}px)`;
}

// 3. ฟังก์ชันสำหรับเลื่อนรูป
function showImage(index) {
    if (allImages.length === 0) return;

    // คำนวณ index แบบวนลูป
    if (index >= allImages.length) {
        currentIndex = 0;
    } else if (index < 0) {
        currentIndex = allImages.length - 1;
    } else {
        currentIndex = index;
    }
    renderGallery();
}

// 4. อัปโหลดรูปภาพ
async function uploadImage(file) {
    if (!file) return;

    const uniqueName = `${Date.now()}_${file.name}`;
    const newFileRef = ref(storage, `images/${uniqueName}`);

    try {
        await uploadBytes(newFileRef, file);
        alert('อัปโหลดรูปเรียบร้อยแล้ว!');
        loadImages(); // โหลดรูปใหม่ทั้งหมด
    } catch (err) {
        console.error("Upload failed:", err);
        alert('อัปโหลดล้มเหลว');
    }
}

// 5. ลบรูปภาพปัจจุบัน
async function deleteCurrentImage() {
    if (allImages.length === 0) {
        alert("ไม่มีรูปภาพให้ลบ");
        return;
    }

    if (!confirm('ต้องการลบรูปนี้จริงหรือไม่?')) return;

    try {
        const imageToDelete = allImages[currentIndex];
        const imageRef = ref(storage, imageToDelete.path);
        await deleteObject(imageRef);

        alert('ลบรูปเรียบร้อยแล้ว');
        // โหลดรูปใหม่และกลับไปที่รูปแรก
        currentIndex = 0;
        loadImages();
    } catch (err) {
        console.error("Delete failed:", err);
        alert('ลบรูปไม่สำเร็จ');
    }
}


// =================================================================
//  Event Listeners (ตัวรับคำสั่งจากผู้ใช้)
// =================================================================

// --- คลิกปุ่ม ---
nextBtn.addEventListener('click', () => showImage(currentIndex + 1));
prevBtn.addEventListener('click', () => showImage(currentIndex - 1));
addBtn.addEventListener('click', () => fileInput.click());
deleteBtn.addEventListener('click', deleteCurrentImage);
fileInput.addEventListener('change', (e) => uploadImage(e.target.files[0]));

// --- การปัด (Swipe) บนมือถือ ---
viewer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
});

viewer.addEventListener('touchend', (e) => {
    const touchEndX = e.changedTouches[0].clientX;
    const swipeDistance = touchEndX - touchStartX;

    if (swipeDistance > 50) { // ปัดไปทางขวา
        showImage(currentIndex - 1);
    } else if (swipeDistance < -50) { // ปัดไปทางซ้าย
        showImage(currentIndex + 1);
    }
});

// --- ปรับขนาดแกลเลอรีเมื่อขนาดหน้าจอเปลี่ยน ---
window.addEventListener('resize', renderGallery);


// --- เริ่มการทำงานครั้งแรก ---
loadImages();