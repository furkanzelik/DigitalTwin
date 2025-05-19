document.getElementById('projectForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const projectName = document.getElementById('projectName').value;
    const location = document.getElementById('location').value;
    const file = document.getElementById('fileUpload').files[0];

    if (!file) {
        alert('Selecteer een 3D-bestand om verder te gaan.');
        return;
    }

    // Voorbeeld: opslaan in localStorage (kan je later ophalen)
    localStorage.setItem('projectName', projectName);
    localStorage.setItem('location', location);
    localStorage.setItem('fileName', file.name);

    // Ga naar scherm 2
    window.location.href = '../pages/SecondPage/step2_upload.html';
});