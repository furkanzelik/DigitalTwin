const viewer = new Cesium.Viewer('cesiumContainer', {
  imageryProvider: new Cesium.OpenStreetMapImageryProvider({ url: 'https://a.tile.openstreetmap.org/' }),
  baseLayerPicker: false,
  animation: false,
  timeline: false,
  geocoder: false,
  sceneModePicker: false,
  navigationHelpButton: false,
  homeButton: false,
});
viewer.scene.globe.depthTestAgainstTerrain = true;

const buildings = new Cesium.Cesium3DTileset({
  url: 'https://www.3drotterdam.nl/datasource-data/d0c755ef-ba1b-43fc-bc44-24fc7bb152ce/tileset.json'
});
viewer.scene.primitives.add(buildings);

let hofpleinLocation = Cesium.Cartesian3.fromDegrees(4.4777, 51.9225, 150);
buildings.readyPromise.then(() => {
  viewer.camera.setView({
    destination: hofpleinLocation,
    orientation: {
      heading: Cesium.Math.toRadians(0),
      pitch: Cesium.Math.toRadians(-35),
      roll: 0
    }
  });
});

// Boom plaats systeem
let placingTree = false;
let co2Percentage = 25.0;
const treeBtn = document.getElementById('addTreeBtn');
const co2Display = document.getElementById('co2Value');

treeBtn.addEventListener('click', () => {
  placingTree = !placingTree;
  treeBtn.classList.toggle('active', placingTree);
  treeBtn.textContent = placingTree ? '🌳 Klik op kaart...' : '🌳 Boom plaatsen';
});

const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
handler.setInputAction((click) => {
  if (!placingTree) return;
  const ray = viewer.camera.getPickRay(click.position);
  const cartesian = viewer.scene.globe.pick(ray, viewer.scene);
  if (!cartesian) return;

  const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
  const lon = Cesium.Math.toDegrees(cartographic.longitude);
  const lat = Cesium.Math.toDegrees(cartographic.latitude);

  addBoom(lat, lon);

  // 📈 Verhoog CO2
  co2Percentage += 0.3;
  document.getElementById('co2Fill').style.height = `${co2Percentage}%`;
  co2Display.innerText = `${co2Percentage.toFixed(1)}%`;
}, Cesium.ScreenSpaceEventType.LEFT_CLICK);

function addBoom(lat, lon, hoogte = 10) {
  viewer.entities.add({
    name: 'Boom',
    position: Cesium.Cartesian3.fromDegrees(lon, lat, 0),
    cylinder: {
      length: hoogte,
      topRadius: 0.5,
      bottomRadius: 0.5,
      material: Cesium.Color.FORESTGREEN,
    }
  });
}

// 📍 Centreer knop
document.getElementById('btn-center').addEventListener('click', () => {
  viewer.camera.flyTo({ destination: hofpleinLocation });
});

// ☁️ CO2 knop
document.getElementById('btn-co2').addEventListener('click', () => {
  document.getElementById('co2Panel').classList.toggle('hidden');
});

// 🌡️ Hittestress knop
document.getElementById('btn-heat').addEventListener('click', () => {
  document.getElementById('heatPanel').classList.toggle('hidden');
});

// 🗺️ Placeholder
document.getElementById('btn-space').addEventListener('click', () => {
  alert('Functie “leegte analyse” komt binnenkort 🚧');
});

document.getElementById('saveAndContinue').addEventListener('click', () => {
  // ⬇️ Voorbeelddata
  const boomCount = window.plantedTreesCount || 0;
  const co2Percentage = Math.min(25 + boomCount * 0.3, 100); // max 100%
  const tempBefore = 35;
  const tempAfter = Math.max(18 - (boomCount * 0.2), 10); // bv. 0.2°C per boom
  
  const data = {
    co2: co2Percentage.toFixed(1),
    tempBefore,
    tempAfter: tempAfter.toFixed(1),
    groen: (co2Percentage * 1.8).toFixed(0) // optioneel
  };

  localStorage.setItem('hofpleinData', JSON.stringify(data));

  window.location.href = '../resultDashboard/resultIndex.html';
});