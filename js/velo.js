'use strict';

async function getStations() {
    try {
        const response = await fetch('https://api.cyclocity.fr/contracts/nancy/gbfs/station_information.json');
        const data = await response.json();
        return data.data.stations;
    } catch (error) {
        console.error(error);
    }
}

async function getStationsStatus() {
    try {
        const response = await fetch('https://api.cyclocity.fr/contracts/nancy/gbfs/station_status.json');
        const data = await response.json();
        return data.data.stations;
    } catch (error) {
        console.error(error);
    }
}

export async function createVeloMap(coords) {
    const stationsData = await getStations();
    const stationsStatusData = await getStationsStatus();

    var map = L.map('map').setView(coords, 13);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    const stations = stationsData.map((station) => {
        const status = stationsStatusData.find((status) => status.station_id === station.station_id);
        return {
            ...station,
            ...status
        };
    });

    stations.forEach((station) => {
        const marker = L.marker([station.lat, station.lon]).addTo(map);
        marker.bindPopup(`
            <h4>${station.name}</h4>
            <p>${station.address}</p>
            <p>${station.num_bikes_available} vélos disponibles</p>
            <p>${station.num_docks_available} places disponibles</p>
        `);
    });

}