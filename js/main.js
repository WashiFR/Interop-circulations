import {getIpInfo} from "./api.js";
import {getCovidData} from "./covid.js";
import {createGraph} from "./graph.js";
import {createVeloMap} from "./velo.js";

const ipInfo = await getIpInfo();
console.log(ipInfo);

const covidData = await getCovidData();
console.log(covidData);

createGraph(covidData, 'Covid cases in Maxeville');

createVeloMap([ipInfo.latitude, ipInfo.longitude]);