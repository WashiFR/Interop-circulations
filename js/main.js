'use strict';

import {getIpInfo, getIUTLocation} from "./ip.js";
import {getAllCovidData} from "./covid.js";
import {createGraph} from "./graph.js";
import {createVeloMap} from "./velo.js";
import {getPolutionAir} from "./polution-air.js";

// ### IP ###
let lat = null;
let lon = null;
let ipInfo = await getIpInfo();
if (!ipInfo) {
    ipInfo = await getIUTLocation();
    lat = ipInfo[0].lat;
    lon = ipInfo[0].lon;
} else {
    lat = ipInfo.latitude;
    lon = ipInfo.longitude;
}
// console.log(ipInfo);

// ### Polution de l'air ###
const polutionAir = await getPolutionAir();
// console.log(polutionAir);
// Ajoute la polution de l'air sur la carte
const polutionAirText = document.getElementById('polution-air');
if (polutionAir) {
    polutionAirText.innerHTML = `Qualité de l'air : ${polutionAir.lib_qual}`;
}

// ### COVID ###
const covidData = await getAllCovidData();
// console.log(covidData);
createGraph(covidData, 'SARS dans les égouts de Maxéville');

// ### Vélos ###
createVeloMap([lat, lon]);