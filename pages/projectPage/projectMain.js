function openCesium() {
  document.getElementById('cesiumOverlay').classList.remove('hidden');
}

function closeCesium() {
  const overlay = document.getElementById('cesiumOverlay');
  overlay.classList.add('hidden');

  // Herlaad iframe bij sluiten (optioneel)
  const iframe = document.getElementById('cesiumFrame');
  iframe.src = iframe.src;
}