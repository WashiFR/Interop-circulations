'use strict';

export async function getPolutionAir() {
    const url = "https://services3.arcgis.com/Is0UwT37raQYl9Jj/arcgis/rest/services/ind_grandest/FeatureServer/0/query?where=lib_zone%3D%27Nancy%27&objectIds=&time=&geometry=&geometryType=esriGeometryEnvelope&inSR=&spatialRel=esriSpatialRelIntersects&resultType=none&distance=0.0&units=esriSRUnit_Meter&returnGeodetic=false&outFields=*&returnGeometry=true&featureEncoding=esriDefault&multipatchOption=xyFootprint&maxAllowableOffset=&geometryPrecision=&outSR=&datumTransformation=&applyVCSProjection=false&returnIdsOnly=false&returnUniqueIdsOnly=false&returnCountOnly=false&returnExtentOnly=false&returnQueryGeometry=false&returnDistinctValues=false&cacheHint=false&orderByFields=&groupByFieldsForStatistics=&outStatistics=&having=&resultOffset=&resultRecordCount=&returnZ=false&returnM=false&returnExceededLimitFeatures=true&quantizationParameters=&sqlFormat=none&f=pjson&token=";

    const response = await fetch(url);
    const data = await response.json();
    let lastFeature = null;

    const today = new Date().toISOString().split('T')[0];
    for (const feature of data.features) {
        const timestamp = feature.attributes.date_ech / 1000;
        const featureDate = new Date(timestamp * 1000).toISOString().split('T')[0];
        if (feature.attributes.lib_zone === 'Nancy' && featureDate === today) {
            lastFeature = feature;
            break;
        }
    }

    return lastFeature ? lastFeature.attributes : null;
}