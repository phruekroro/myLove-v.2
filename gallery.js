// gallery.js

document.addEventListener('DOMContentLoaded', () => {

  const CLOUD_NAME = "dpojattoi";
  const UPLOAD_PRESET = "unsigned_gallery";

  const viewer = document.querySelector('.gallery-viewer');
  const addBtn = document.getElementById('add-btn');
  const prevBtn = document.getElementById('prev-btn');
  const nextBtn = document.getElementById('next-btn');

  const confirmPopup = document.getElementById('confirm-popup');
  const confirmDeleteBtn = document.getElementById('confirm-delete');
  const cancelDeleteBtn = document.getElementById('cancel-delete');

  // --- 1. โหลดรูปจาก Local Storage ---
  // ดึงข้อมูลที่เป็น string จาก 'galleryImages' แล้วแปลงกลับเป็น array
  // ถ้าไม่มีข้อมูลเก่าเลย ให้เริ่มต้นด้วย array ว่าง []
  let allImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
  
  let currentIndex = 0;
  let imageToDeleteIndex = -1;

  // --- 2. สร้างฟังก์ชันสำหรับบันทึกข้อมูล ---
  function saveImagesToLocalStorage() {
    // แปลง array ของรูปภาพให้เป็น string ก่อนบันทึก
    localStorage.setItem('galleryImages', JSON.stringify(allImages));
  }

  // --- ฟังก์ชันแสดงผลแกลเลอรี (เหมือนเดิม) ---
  function renderGallery() {
    viewer.innerHTML = '';
    if (allImages.length === 0) {
      viewer.innerHTML = '<p style="color: #ff6b81;">ยังไม่มีรูปภาพในแกลเลอรี<br>กดปุ่ม "＋ เพิ่มรูป" เพื่อเริ่มต้น</p>';
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
      return;
    }
    
    if (allImages.length === 1) {
      prevBtn.style.display = 'none';
      nextBtn.style.display = 'none';
    } else {
      prevBtn.style.display = 'block';
      nextBtn.style.display = 'block';
    }

    allImages.forEach((url, index) => {
      const itemDiv = document.createElement('div');
      itemDiv.className = 'gallery-item';

      const img = document.createElement('img');
      img.src = url;
      img.alt = `รูปที่ ${index + 1}`;
      
      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.innerHTML = '<i class="fas fa-times"></i>';
      deleteBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        imageToDeleteIndex = index;
        confirmPopup.classList.remove('hidden');
      });

      itemDiv.appendChild(img);
      itemDiv.appendChild(deleteBtn);
      viewer.appendChild(itemDiv);
    });
    updateClasses();
  }

  // --- ฟังก์ชันอัปเดต Class (เหมือนเดิม) ---
  function updateClasses() {
    const items = document.querySelectorAll('.gallery-item');
    items.forEach((item, index) => {
      item.classList.remove('active', 'left', 'right');
      if (index === currentIndex) {
        item.classList.add('active');
      } else if (allImages.length > 1) {
        if (index === (currentIndex - 1 + allImages.length) % allImages.length) {
          item.classList.add('left');
        } else if (index === (currentIndex + 1) % allImages.length) {
          item.classList.add('right');
        }
      }
    });
  }

  // --- จัดการการเลื่อนรูป (เหมือนเดิม) ---
  prevBtn.addEventListener('click', () => {
    if (allImages.length > 0) {
      currentIndex = (currentIndex - 1 + allImages.length) % allImages.length;
      updateClasses();
    }
  });

  nextBtn.addEventListener('click', () => {
    if (allImages.length > 0) {
      currentIndex = (currentIndex + 1) % allImages.length;
      updateClasses();
    }
  });

  // --- Cloudinary Upload Widget ---
  const myWidget = cloudinary.createUploadWidget({
    cloudName: CLOUD_NAME,
    uploadPreset: UPLOAD_PRESET,
    folder: 'gallery',
    sources: ['local', 'url', 'camera'],
    multiple: true,
    maxFiles: 10,
    maxFileSize: 5000000,
  }, (error, result) => {
    if (!error && result && result.event === "success") {
      allImages.push(result.info.secure_url);
      currentIndex = allImages.length - 1;
      
      // --- 3. บันทึกข้อมูลหลังเพิ่มรูป ---
      saveImagesToLocalStorage(); // <-- เพิ่มบรรทัดนี้

      renderGallery();
    } else if (error) {
      console.error('Upload Error:', error);
    }
  });

  // เปิด widget
  addBtn.addEventListener('click', (e) => {
    e.preventDefault();
    myWidget.open();
  });

  // --- Logic สำหรับ Popup ยืนยันการลบ ---
  confirmDeleteBtn.addEventListener('click', () => {
    if (imageToDeleteIndex !== -1) {
      allImages.splice(imageToDeleteIndex, 1);
      
      if (currentIndex > imageToDeleteIndex || currentIndex === allImages.length) {
          currentIndex = Math.max(0, currentIndex - 1);
      }

      // --- 4. บันทึกข้อมูลหลังลบรูป ---
      saveImagesToLocalStorage(); // <-- เพิ่มบรรทัดนี้

      renderGallery();
      imageToDeleteIndex = -1;
      confirmPopup.classList.add('hidden');
    }
  });

  cancelDeleteBtn.addEventListener('click', () => {
    imageToDeleteIndex = -1;
    confirmPopup.classList.add('hidden');
  });
  
  // เพิ่มโค้ด Swipe (เหมือนเดิม)
  let touchStartX = 0;
  let touchEndX = 0;
  const minSwipeDistance = 50;

  viewer.addEventListener('touchstart', (e) => {
    touchStartX = e.touches[0].clientX;
  });

  viewer.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].clientX;
    const deltaX = touchEndX - touchStartX;
    if (allImages.length > 1) {
      if (deltaX > minSwipeDistance) {
        prevBtn.click();
      } else if (deltaX < -minSwipeDistance) {
        nextBtn.click();
      }
    }
  });

  // --- เริ่มการทำงานครั้งแรก ---
  renderGallery(); // โค้ดนี้จะดึงข้อมูลจาก localStorage มาแสดงผลเอง
});