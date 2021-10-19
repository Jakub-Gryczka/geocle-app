'use strict';

const mymap = L.map('mapid').setView([52.19349790168748, 20.93058149735026], 17);

const titleLayer = L.tileLayer(
  'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiamFja3RoZWJveCIsImEiOiJja3V5ZGJyZzgxd20xMnZvMGkyMTh2ejdyIn0.QEETAArtqcdGkIZcgtzEug',
  {
    attribution:
      'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'pk.eyJ1IjoiamFja3RoZWJveCIsImEiOiJja3V5ZGJyZzgxd20xMnZvMGkyMTh2ejdyIn0.QEETAArtqcdGkIZcgtzEug',
  }
).addTo(mymap);
const parking1 = L.circle([52.19349790168748, 20.93058149735026], {
  color: 'blue',
  fillColor: '#1F51FF',
  fillOpacity: 0.5,
  radius: 20,
}).addTo(mymap);

const truckMarker = L.marker([52.1935161702226, 20.9304286193486]).addTo(mymap);
const availableIcon = new L.icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

const vehicle1 = {
  platesNumber: 'WZPV001',
  sideNumber: 'Z3-PVAN-01',
  color: 'white',
  type: 'TRUCK',
  rangeKm: 193,
  batteryLevelPct: 98,
  reservationEnd: null,
  reservation: null,
  status: 'AVAILABLE',
  locationDescription: 'Vehicle is located on the first floor of the parking',
  promotion: null,
  id: '00000000-0000-0000-0005-000000000003',
  name: 'Enigma Python Van',
  description: null,
  metadata: null,
};
const truckDetails = function () {
  if (!vehicle1.reservationEnd || this.reservation) {
    vehicle1.reservationEnd = 'Not reserved by anyone';
    vehicle1.reservation = 'Not reserved';
  }
  if (!vehicle1.promotion) vehicle1.promotion = 'Excluded from promotion';
  if (!vehicle1.description) vehicle1.description = 'No description';
  if (!vehicle1.metadata) vehicle1.metadata = 'No metadata';
};
truckDetails();

truckMarker.bindPopup(`<font size="4"><b>${vehicle1.name}</b></font>
<br>Plates number: ${vehicle1.platesNumber}
<br>Side number: ${vehicle1.sideNumber}
<br>Vehicle color: ${vehicle1.color}
<br>Type of vehicle: ${vehicle1.type}
<br><b>Vehicle range in km: ${vehicle1.rangeKm}</b>
<br><b>Battery level: ${vehicle1.batteryLevelPct}%</b>
<br><b>Reservation ends in: ${vehicle1.reservationEnd}</b>
<br><b>Vehicle is reserved by: ${vehicle1.reservation}</b>
<br><b>Status of car: ${vehicle1.status}</b>
<br><b>Location: ${vehicle1.locationDescription}</b>
<br>Current promotions: ${vehicle1.promotion}
<br>Description of the vehicle: ${vehicle1.description}
<br>Metadata of the vehicle: ${vehicle1.metadata}
<br>ID of the vehicle: ${vehicle1.metadata}`);