'use strict';

export async function getIpInfo() {
    try {
        const repsonse = await fetch('https://ipapi.co/json/');
        return await repsonse.json();
    } catch (error) {
        console.error(error);
    }
}

export async function getIUTLocation() {
    try {
        const response = await fetch('https://nominatim.openstreetmap.org/search?q=iut+nancy+charlemagne&format=json');
        return await response.json();
    } catch (error) {
        console.error(error);
    }
}