// /dashboard/script.js

// File input -> filename
document.getElementById('fileInput').addEventListener('change', function () {
    const filenameBox = document.getElementById('filename');
    if (this.files.length > 0) {
      filenameBox.value = this.files[0].name;
    }
  });
  
  // Modal logic
  const modal = document.getElementById('projectModal');
  const openModal = document.querySelector('.create-link');
  const closeModal = document.querySelector('.close-modal');
  
  openModal.addEventListener('click', function (e) {
    e.preventDefault();
    modal.classList.remove('hidden');
  });
  
  closeModal.addEventListener('click', function () {
    modal.classList.add('hidden');
  });
  
  modal.addEventListener('click', function (e) {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });