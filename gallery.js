// gallery.js

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-app.js";
import { getStorage, ref, listAll, getDownloadURL, uploadBytes, deleteObject } from "https://www.gstatic.com/firebasejs/12.2.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyB5Fs_LyLytWLhXyUv_-hl1Us1XtQVCtBs",
  authDomain: "couple-photo-ce080.firebaseapp.com",
  projectId: "couple-photo-ce080",
  storageBucket: "couple-photo-ce080.appspot.com",
  messagingSenderId: "636387547630",
  appId: "1:636387547630:web:8b8e7e8694a14d39fc16ff"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const imagesRef = ref(storage, 'images/');

const galleryContainer = document.getElementById('gallery-container');
const fileInput = document.getElementById('fileInput');

async function loadImages() {
  galleryContainer.innerHTML = ''; 

  try {
    const res = await listAll(imagesRef);
    const items = res.items;

    const urls = await Promise.all(items.map(item => getDownloadURL(item)));

    urls.forEach((url, i) => {
      const imgDiv = document.createElement('div');
      imgDiv.className = 'gallery-item';

      const img = document.createElement('img');
      img.src = url;
      img.alt = `รูปที่ ${i + 1}`;
      imgDiv.appendChild(img);

      const delBtn = document.createElement('button');
      delBtn.className = 'delete-btn';
      delBtn.textContent = '✖';
      delBtn.onclick = () => deleteImage(items[i].fullPath);
      imgDiv.appendChild(delBtn);

      galleryContainer.appendChild(imgDiv);
    });

    // ปุ่มเพิ่มรูป
    const addDiv = document.createElement('div');
    addDiv.className = 'gallery-item add-item';
    addDiv.innerHTML = '+';
    addDiv.onclick = () => fileInput.click();
    galleryContainer.appendChild(addDiv);

  } catch (error) {
    console.error('Error loading images:', error);
  }
}

fileInput.addEventListener('change', async (e) => {
  const file = e.target.files[0];
  if (!file) return;

  try {
    const newFileRef = ref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(newFileRef, file);
    alert('อัปโหลดรูปเรียบร้อยแล้ว!');
    fileInput.value = '';
    loadImages();
  } catch (err) {
    alert('อัปโหลดล้มเหลว', err);
  }
});

// ปุ่มเพิ่มรูปด้านขวาบน
document.getElementById('add-button-top').onclick = () => fileInput.click();


async function deleteImage(path) {
  if (!confirm('ต้องการลบรูปนี้จริงหรือไม่?')) return;

  try {
    const imageRef = ref(storage, path);
    await deleteObject(imageRef);
    alert('ลบรูปเรียบร้อยแล้ว');
    loadImages();
  } catch (err) {
    alert('ลบรูปไม่สำเร็จ', err);
  }
}

loadImages();
