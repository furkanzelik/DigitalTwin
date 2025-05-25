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
  const previewImage = document.getElementById('previewImage');
  const uploadIcon = document.getElementById('uploadIcon');
  const uploadText = document.getElementById('uploadText');
  const saveBtn = document.querySelector('.save');


  projectBox.addEventListener('click', () => {
    modal.classList.remove('hidden');
    step1.classList.remove('hidden');
    step2.classList.add('hidden');
  });

  closeModal.addEventListener('click', () => {
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });

  nextBtn.addEventListener('click', () => {
    step1.classList.add('hidden');
    step2.classList.remove('hidden');
  });

  prevBtn.addEventListener('click', () => {
    step2.classList.add('hidden');
    step1.classList.remove('hidden');
  });

  fileInput.addEventListener('change', () => {
    if (fileInput.files.length > 0) {
      const file = fileInput.files[0];
      filenameBox.value = file.name;

      if (file.type.startsWith('image/')) {
        const imageURL = URL.createObjectURL(file);
        previewImage.src = imageURL;
        previewImage.classList.remove('hidden');
        uploadIcon.classList.add('hidden');
        uploadText.classList.add('hidden');
      } else {
        previewImage.classList.add('hidden');
        previewImage.src = '';
        uploadIcon.classList.remove('hidden');
        uploadText.classList.remove('hidden');
      }
    }
  });

  saveBtn.addEventListener('click', (e) => {
    e.preventDefault(); // voorkomt formulier-submit en reload

    // 👉 hier zou je ook nog form-validatie kunnen doen

    // ✅ Redirect naar projectpagina
    window.location.href = '../projectPage/projectIndex.html';
  });
});