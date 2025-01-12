'use strict';

export async function getCovidData() {
    const url = 'https://tabular-api.data.gouv.fr/api/resources/2963ccb5-344d-4978-bdd3-08aaf9efe514/data/?page=1&page_size=50';
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