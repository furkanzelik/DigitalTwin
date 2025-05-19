document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('projectModal');
    const projectBox = document.querySelector('.project-box.clickable');
    const closeModal = document.querySelector('.close-modal');
  
    const step1 = document.getElementById('modalStep1');
    const step2 = document.getElementById('modalStep2');
    const nextBtn = document.getElementById('nextStep');
    const prevBtn = document.getElementById('prevStep');
    const fileInput = document.getElementById('fileInput');
    const filenameBox = document.getElementById('filename');
  
    // 🔓 Modal openen op klik
    projectBox.addEventListener('click', () => {
      modal.classList.remove('hidden');
      step1.classList.remove('hidden');
      step2.classList.add('hidden');
    });
  
    // ❌ Modal sluiten via X
    closeModal.addEventListener('click', () => {
      modal.classList.add('hidden');
    });
  
    // ❌ Modal sluiten via achtergrond
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  
    // 👉 Stap 1 naar 2
    nextBtn.addEventListener('click', () => {
      step1.classList.add('hidden');
      step2.classList.remove('hidden');
    });
  
    // 👈 Stap 2 naar 1
    prevBtn.addEventListener('click', () => {
      step2.classList.add('hidden');
      step1.classList.remove('hidden');
    });
  
    // 📂 Toon bestandsnaam
    fileInput.addEventListener('change', () => {
      if (fileInput.files.length > 0) {
        filenameBox.value = fileInput.files[0].name;
      }
    });
  });