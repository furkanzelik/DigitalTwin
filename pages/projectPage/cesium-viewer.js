const viewer = new Cesium.Viewer('cesiumContainer', {
    imageryProvider: new Cesium.OpenStreetMapImageryProvider({
      url: 'https://a.tile.openstreetmap.org/'
    }),
    baseLayerPicker: false,
    animation: false,
    timeline: false,
    geocoder: false,
    sceneModePicker: false,
    navigationHelpButton: false,
    homeButton: false,
  });
  
  const buildings = new Cesium.Cesium3DTileset({
    url: 'https://www.3drotterdam.nl/datasource-data/d0c755ef-ba1b-43fc-bc44-24fc7bb152ce/tileset.json'
  });
  viewer.scene.primitives.add(buildings);
  
  // 📍 Hofplein
  buildings.readyPromise.then(() => {
    const hofplein = Cesium.Cartesian3.fromDegrees(4.4777, 51.9225, 80);
    viewer.camera.setView({
      destination: hofplein,
      orientation: {
        heading: Cesium.Math.toRadians(0),
        pitch: Cesium.Math.toRadians(-35),
        roll: 0
      }
    });
  });
  
  // 🌳 Boom toevoegen via muisklik
  let placingTree = false;
  const treeBtn = document.getElementById('addTreeBtn');
  
  treeBtn.addEventListener('click', () => {
    placingTree = !placingTree;
    treeBtn.classList.toggle('active', placingTree);
    treeBtn.textContent = placingTree ? '🌳 Klik op kaart...' : '🌳 Boom plaatsen';
  });
  
  const handler = new Cesium.ScreenSpaceEventHandler(viewer.scene.canvas);
  handler.setInputAction((click) => {
    if (!placingTree) return;
  
    const cartesian = viewer.scene.pickPosition(click.position);
    if (!cartesian) return;
  
    const cartographic = Cesium.Cartographic.fromCartesian(cartesian);
    const lon = Cesium.Math.toDegrees(cartographic.longitude);
    const lat = Cesium.Math.toDegrees(cartographic.latitude);
  
    addBoom(lat, lon);
  
    placingTree = false;
    treeBtn.classList.remove('active');
    treeBtn.textContent = '🌳 Boom plaatsen';
  }, Cesium.ScreenSpaceEventType.LEFT_CLICK);
  
  // 🌱 Boom toevoegen
  function addBoom(lat, lon, hoogte = 10) {
    const position = Cesium.Cartesian3.fromDegrees(lon, lat, 0);
  
    viewer.entities.add({
      name: 'Boom',
      position: position,
      cylinder: {
        length: hoogte,
        topRadius: 0.5,
        bottomRadius: 0.5,
        material: Cesium.Color.FORESTGREEN,
      }
    });
  }