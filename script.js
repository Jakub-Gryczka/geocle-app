'use strict';
const parkingButton = document.querySelector('.find-parking');
function flyToParking() {
  L.DomEvent.on(parkingButton, 'click', function () {
    const zoomlvl = 18;
    mymap.flyTo(parking1.getLatLng(), zoomlvl);
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
const vehicleArray = [vehicle1, vehicle2, vehicle3];
const details = vehicleArray.map(vehicle => {
  if (!vehicle.reservationEnd || vehicle.reservation) {
    vehicle.reservationEnd = 'Not reserved by anyone';
    vehicle.reservation = 'Not reserved';

    if (!vehicle.promotion) vehicle.promotion = 'Excluded from promotion';
    if (!vehicle.description) vehicle.description = 'No description';
    if (!vehicle.metadata) vehicle.metadata = 'No metadata';
  }
});
const transformedVehicleArray = vehicleArray.map(
  vehicle => `<font size="4"><b>${vehicle.name}</b></font>
<br>Plates number: ${vehicle.platesNumber}
<br>Side number: ${vehicle.sideNumber}
<br>Vehicle color: ${vehicle.color}
<br>Type of vehicle: ${vehicle.type}
<br><b>Vehicle range in km: ${vehicle.rangeKm}</b>
<br><b>Battery level: ${vehicle.batteryLevelPct}%</b>
<br><b>Reservation ends in: ${vehicle.reservationEnd}</b>
<br><b>Vehicle is reserved by: ${vehicle.reservation}</b>
<br><b>Status of car: ${vehicle.status}</b>
<br><b>Location: ${vehicle.locationDescription}</b>
<br>Current promotions: ${vehicle.promotion}
<br>Description of the vehicle: ${vehicle.description}
<br>Metadata of the vehicle: ${vehicle.metadata}
<br>ID of the vehicle: ${vehicle.id}`
);

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

const truckIcon = L.icon({
  iconUrl: 'assets/a_truck.png',
  iconSize: [35, 35],
  iconAnchor: [20, 25],
  popupAnchor: [-3, -15],
});
const carIcon = L.icon({
  iconUrl: 'assets/a_car.png',
  iconSize: [35, 35],
  iconAnchor: [20, 25],
  popupAnchor: [-3, -15],
});

const addressPoints = [
  {
    lat: 52.1935161702226,
    lon: 20.9304286193486,
    vehicle: vehicle1,
  },
  {
    lat: 52.193275,
    lon: 20.930372,
    vehicle: vehicle2,
  },
  {
    lat: 52.193891367697,
    lon: 20.930564789789,
    vehicle: vehicle3,
  },
];

const markers = L.markerClusterGroup();

function rebuildMap(config) {
  const marker = [];
  markers.clearLayers();
  for (let i = 0; i < addressPoints.length; i++) {
    let addressPoint = addressPoints[i];
    if (
      config.typesPresented.has(addressPoint.vehicle.type) &&
      (!config.showAvailableOnly || addressPoint.vehicle.status == 'AVAILABLE')
    ) {
      let title = addressPoint.vehicle.name;
      marker[i] = L.marker(new L.LatLng(addressPoint.lat, addressPoint.lon), {
        title: title,
        icon: addressPoint.vehicle.type == 'CAR' ? carIcon : truckIcon,
      });
      if (title === `${vehicle1.name}`) {
        marker[i].bindPopup(transformedVehicleArray[0]);
      } else if (title === `${vehicle2.name}`) {
        marker[i].bindPopup(transformedVehicleArray[1]);
      } else {
        marker[i].bindPopup(transformedVehicleArray[2]);
      }
      markers.addLayer(marker[i]);
    }
  }
  mymap.addLayer(markers);
}

const MAP_FILTERS_CONFIG = {
  typesPresented: new Set(['CAR', 'TRUCK']),
  showAvailableOnly: false,
};

rebuildMap(MAP_FILTERS_CONFIG);

document.getElementById('car-filter').onclick = function () {
  console.log('Has Car? ' + MAP_FILTERS_CONFIG.typesPresented.has('CAR'));
  if (MAP_FILTERS_CONFIG.typesPresented.has('TRUCK')) {
    MAP_FILTERS_CONFIG.typesPresented.delete('TRUCK');
    rebuildMap(MAP_FILTERS_CONFIG);
  } else if (!MAP_FILTERS_CONFIG.typesPresented.has('TRUCK')) {
    MAP_FILTERS_CONFIG.typesPresented.add('TRUCK');
    rebuildMap(MAP_FILTERS_CONFIG);
  }
};
document.getElementById('truck-filter').onclick = function () {
  if (MAP_FILTERS_CONFIG.typesPresented.has('CAR')) {
    MAP_FILTERS_CONFIG.typesPresented.delete('CAR');
    rebuildMap(MAP_FILTERS_CONFIG);
  } else {
    MAP_FILTERS_CONFIG.typesPresented.add('CAR');
    rebuildMap(MAP_FILTERS_CONFIG);
  }
};
document.getElementById('show-all-filter').onclick = function () {
  if (MAP_FILTERS_CONFIG.typesPresented.has('CAR', 'TRUCK')) {
    rebuildMap(MAP_FILTERS_CONFIG);
  } else {
    MAP_FILTERS_CONFIG.typesPresented.add('CAR', 'TRUCK');
    rebuildMap(MAP_FILTERS_CONFIG);
  }
};
