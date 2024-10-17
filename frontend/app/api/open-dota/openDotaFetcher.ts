// SAMPLE CALL: https://api.opendota.com/api/matches/271145478?api_key=0f1403ff-48f4-4adc-a4f8-c2459894fe52

export const openDotaFetcher = async (endpoint: string, params = '') => {
    const res = await fetch(`/api/open-dota?endpoint=${endpoint}&params=${params}`);
    const data = await res.json();
    if (!res.ok) throw new Error(data.error || 'Failed to fetch data');
    return data;
};

