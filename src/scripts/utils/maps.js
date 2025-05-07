import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const customIcon = L.icon({
  iconUrl: '/images/leaf-red.png',
  shadowUrl: '/images/leaf-shadow.png',
  iconSize: [25, 41], // size of the icon
  shadowSize: [41, 41], // size of the shadow
  iconAnchor: [12, 41], // point of the icon which will correspond to marker's location
  shadowAnchor: [12, 41], // the same for the shadow
  popupAnchor: [1, -34], // point from which the popup should open relative to the iconAnchor
});

export default class Map {
  constructor(mapContainerId, options = {}) {
    this.mapContainerId = mapContainerId;
    this.options = options;
    this.map = null;
    this.geoJsonLayer = null;
  }

  initMap(center = [0, 0], zoom = 2) {
    this.map = L.map(this.mapContainerId, this.options).setView(center, zoom);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);
  }

  addGeoJson(geoJsonData, options = {}) {
    if (this.geoJsonLayer) {
      this.geoJsonLayer.remove();
    }
    this.geoJsonLayer = L.geoJSON(geoJsonData, options).addTo(this.map);
  }

  setView(center, zoom) {
    if (this.map) {
      this.map.setView(center, zoom);
    }
  }

  addMarker(latlng, options = {}) {
    if (this.map) {
      const markerOptions = { icon: customIcon, ...options };
      return L.marker(latlng, markerOptions).addTo(this.map);
    }
    return null;
  }
}
