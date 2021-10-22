'use strict';
const parkingButton = document.querySelector('.find-parking');
function flyToParking() {
  L.DomEvent.on(parkingButton, 'click', function () {
    const zoomlvl = 17;
    mymap.flyTo(parking1.getLatLng(), zoomlvl);
  });
}
function flyToMarkers() {
  L.DomEvent.on(markers, 'click', function () {
    const zoomlvl = 13;
    mymap.flyTo(markers.getLatLng(), zoomlvl);
  });
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
    <br>ID of the vehicle: ${vehicle1.metadata}`;
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
  radius: 30,
}).addTo(mymap);
flyToParking();
parking1.bindPopup(`<b><font size = "3">Parking for vehicles.</font></b>
<br>There is located a parking for Our vehicles.`);

//const truckMarker = L.marker([52.1935161702226, 20.9304286193486]).addTo(mymap);
//const carMarker1 = L.marker([52.1935051400699, 20.930787718473074]).addTo(mymap);

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
const addressPoints = [
  [52.1935161702226, 20.9304286193486, vehicle1.name],
  [52.193275, 20.930372, vehicle2.name],
  [52.1935051400688, 20.93078771847324, '3'],
];
const markers = L.markerClusterGroup();
for (let i = 0; i < addressPoints.length; i++) {
  let a = addressPoints[i];
  let title = a[2];
  let marker = L.marker(new L.LatLng(a[0], a[1]), {
    title: title,
  });
  console.log(marker);
  if (title === `${vehicle1.name}`) {
    marker.bindPopup(enigmaTruckBind);
  } else {
    marker.bindPopup(title);
  }
  markers.addLayer(marker);
}
mymap.addLayer(markers);
// it's doing literally nothing
const vehicles = [vehicle1, vehicle2];
for (let i = 0; i < vehicles.length; i++) {
  let a = vehicles[i];
  let popup = `<font size="4"><b>${a.name}</b></font>
  <br>Plates number: ${a.platesNumber}
  <br>Side number: ${a.sideNumber}
  <br>Vehicle color: ${a.color}
  <br>Type of vehicle: ${a.type}
  <br><b>Vehicle range in km: ${a.rangeKm}</b>
  <br><b>Battery level: ${a.batteryLevelPct}%</b>
  <br><b>Reservation ends in: ${a.reservationEnd}</b>
  <br><b>Vehicle is reserved by: ${a.reservation}</b>
  <br><b>Status of car: ${a.status}</b>
  <br><b>Location: ${a.locationDescription}</b>
  <br>Current promotions: ${a.promotion}
  <br>Description of the vehicle: ${a.description}
  <br>Metadata of the vehicle: ${a.metadata}
  <br>ID of the vehicle: ${a.metadata}`;
}

const truckIcon = L.icon({
  iconUrl: 'images/a_truck.png',
  iconSize: [38, 95],
  iconAnchor: [22, 94],
  popupAnchor: [-3, -76],
});
