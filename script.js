'use strict';
const clusterGroup = document.querySelector('.marker-cluster');
const parkingButton = document.querySelector('.find-parking');
function flyToParking() {
  L.DomEvent.on(parkingButton, 'click', function () {
    const zoomlvl = 17;
    mymap.flyTo(parking1.getLatLng(), zoomlvl);
  });
}
function truckDetails() {
  if (!vehicle1.reservationEnd || this.reservation) {
    vehicle1.reservationEnd = 'Not reserved by anyone';
    vehicle1.reservation = 'Not reserved';
  }
  if (!vehicle1.promotion) vehicle1.promotion = 'Excluded from promotion';
  if (!vehicle1.description) vehicle1.description = 'No description';
  if (!vehicle1.metadata) vehicle1.metadata = 'No metadata';
}
function carDetails() {
  if (!vehicle2.reservationEnd || this.reservation) {
    vehicle2.reservationEnd = 'Not reserved by anyone';
    vehicle2.reservation = 'Not reserved';
  }
  if (!vehicle2.promotion) vehicle2.promotion = 'Excluded from promotion';
  if (!vehicle2.description) vehicle2.description = 'No description';
  if (!vehicle2.metadata) vehicle2.metadata = 'No metadata';
  // if (!vehicle3.reservationEnd || this.reservation) {
  //   vehicle3.reservationEnd = 'Not reserved by anyone';
  //   vehicle3.reservation = 'Not reserved';
}

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
  isTruck: true,
};
truckDetails();
const vehicle2 = {
  platesNumber: 'WZ8748W',
  sideNumber: 'Z1-WH-01',
  color: 'white',
  type: 'CAR',
  rangeKm: 134,
  batteryLevelPct: 86,
  reservationEnd: null,
  reservation: null,
  status: 'AVAILABLE',
  locationDescription: 'Vehicle is located on the first floor of the parking',
  promotion: null,
  id: '00000000-0000-0000-0005-000000000001',
  name: 'Nissan Leaf White',
  description: null,
  metadata: null,
  isCar: true,
};
carDetails();
const vehicle3 = {
  platesNumber: 'WZPC001',
  sideNumber: 'Z4-PCAR-01',
  color: 'white',
  type: 'CAR',
  rangeKm: 193,
  batteryLevelPct: 98,
  reservationEnd: null,
  reservation: null,
  status: 'AVAILABLE',
  locationDescription: 'Vehicle is located on the first floor of the parking',
  promotion: null,
  id: '00000000-0000-0000-0005-000000000004',
  name: 'Enigma Python Car',
  description: null,
  metadata: null,
  isCar: true,
};
const enigmaTruckBind = `<font size="4"><b>${vehicle1.name}</b></font>
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
    <br>ID of the vehicle: ${vehicle1.id}`;

const nissanCarBind = `<font size="4"><b>${vehicle2.name}</b></font>
<br>Plates number: ${vehicle2.platesNumber}
<br>Side number: ${vehicle2.sideNumber}
<br>Vehicle color: ${vehicle2.color}
<br>Type of vehicle: ${vehicle2.type}
<br><b>Vehicle range in km: ${vehicle2.rangeKm}</b>
<br><b>Battery level: ${vehicle2.batteryLevelPct}%</b>
<br><b>Reservation ends in: ${vehicle2.reservationEnd}</b>
<br><b>Vehicle is reserved by: ${vehicle2.reservation}</b>
<br><b>Status of car: ${vehicle2.status}</b>
<br><b>Location: ${vehicle2.locationDescription}</b>
<br>Current promotions: ${vehicle2.promotion}
<br>Description of the vehicle: ${vehicle2.description}
<br>Metadata of the vehicle: ${vehicle2.metadata}
<br>ID of the vehicle: ${vehicle2.id}`;

const enigmaCarBind = `<font size="4"><b>${vehicle3.name}</b></font>
<br>Plates number: ${vehicle3.platesNumber}
<br>Side number: ${vehicle3.sideNumber}
<br>Vehicle color: ${vehicle3.color}
<br>Type of vehicle: ${vehicle3.type}
<br><b>Vehicle range in km: ${vehicle3.rangeKm}</b>
<br><b>Battery level: ${vehicle3.batteryLevelPct}%</b>
<br><b>Reservation ends in: ${vehicle3.reservationEnd}</b>
<br><b>Vehicle is reserved by: ${vehicle3.reservation}</b>
<br><b>Status of car: ${vehicle3.status}</b>
<br><b>Location: ${vehicle3.locationDescription}</b>
<br>Current promotions: ${vehicle3.promotion}
<br>Description of the vehicle: ${vehicle3.description}
<br>Metadata of the vehicle: ${vehicle3.metadata}
<br>ID of the vehicle: ${vehicle3.id}`;

const mymap = L.map('mapid').setView([52.19349790168748, 20.93058149735026], 13);

const myLocation = L.control
  .locate({
    position: 'topleft',
    strings: {
      title: 'Locate me!',
    },
    flyTo: true,
    onLocationError: 'An error occured',
  })
  .addTo(mymap);

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
const parking1 = L.circle([52.19339312958948, 20.930523991888947], {
  color: 'blue',
  fillColor: '#1F51FF',
  fillOpacity: 0.5,
  radius: 80,
}).addTo(mymap);
flyToParking();
parking1.bindPopup(`<b><font size = "3">Parking for vehicles.</font></b>
<br>There is located a parking for Our vehicles.`);

//const truckMarker = L.marker([52.1935161702226, 20.9304286193486]).addTo(mymap);
//const carMarker1 = L.marker([52.1935051400699, 20.930787718473074]).addTo(mymap);

const truckIcon = L.icon({
  iconUrl: '/assets/a_truck.png',
  iconSize: [35, 35],
  iconAnchor: [20, 25],
  popupAnchor: [-3, -15],
});
const carIcon = L.icon({
  iconUrl: '/assets/a_car.png',
  iconSize: [35, 35],
  iconAnchor: [20, 25],
  popupAnchor: [-3, -15],
});

const addressPoints = [
  [52.1935161702226, 20.9304286193486, vehicle1.name],
  [52.193275, 20.930372, vehicle2.name],
  [52.193891367697, 20.930564789789, vehicle3.name],
];

const marker = [];
const markers = L.markerClusterGroup();
for (let i = 0; i < addressPoints.length; i++) {
  let a = addressPoints[i];
  let title = a[2];
  marker[i] = L.marker(new L.LatLng(a[0], a[1]), {
    title: title,
    icon: marker[0] ? carIcon : truckIcon,
  });
  if (title === `${vehicle1.name}`) {
    marker[i].bindPopup(enigmaTruckBind);
  } else if (title === `${vehicle2.name}`) {
    marker[i].bindPopup(nissanCarBind);
  } else {
    marker[i].bindPopup(enigmaCarBind);
  }
  markers.addLayer(marker[i]);
}
mymap.addLayer(markers);
