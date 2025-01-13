'use strict';

async function getCovidData(page, pageSize) {
    const url = `https://tabular-api.data.gouv.fr/api/resources/2963ccb5-344d-4978-bdd3-08aaf9efe514/data/?page=${page}&page_size=${pageSize}`;
    try {
        const response = await fetch(url);
        const data = await response.json();
        const maxevilleData = data.data
            .filter(item => item.MAXEVILLE !== null)
            .map(item => ({
                label: item.semaine,
                value: item.MAXEVILLE
            }));
        return maxevilleData;
    } catch (error) {
        console.error(error);
        return [];
    }
}

export async function getAllCovidData() {
    let page = 1;
    let allData = [];

    while (true) {
        const data = await getCovidData(page, 50);
        if (data.length === 0) {
            break;
        }
        allData = allData.concat(data);
        page++;
    }

    return allData;
}