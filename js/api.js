'use strict';

export async function getIpInfo() {
    try {
        const repsonse = await fetch('https://ipapi.co/json/');
        return await repsonse.json();
    } catch (error) {
        console.error(error);
    }
}