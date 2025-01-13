import {getIpInfo, getIUTLocation} from "./api.js";
import {getCovidData} from "./covid.js";
import {createGraph} from "./graph.js";
import {createVeloMap} from "./velo.js";

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
console.log(ipInfo);

const covidData = await getCovidData();
console.log(covidData);

createGraph(covidData, 'SARS dans les égouts de Maxéville');

createVeloMap([lat, lon]);