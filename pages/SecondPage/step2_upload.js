// /mockups/step2_upload.js
document.getElementById('fileInput').addEventListener('change', function () {
  const filenameBox = document.getElementById('filename');
  if (this.files.length > 0) {
    filenameBox.value = this.files[0].name;
  }
});

document.getElementsByClassName('back')[0].addEventListener('click', function () {
  window.location.href = '../../index.html';
}
);