import { openDotaFetcher } from '@/lib/openDotaFetcher';

export const fetchPlayerData = async (playerId: string) => {
    const response = await openDotaFetcher(`players/${playerId}`, '');
    return response;
};

export const fetchWinLose = async (playerId: string) => {
    const response = await openDotaFetcher(`players/${playerId}/wl`, '');
    return response;
};

export const fetchRecentMatches = async (playerId: string) => {
    const response = await openDotaFetcher(`players/${playerId}/recentMatches`, '');
    return response;
};

export const fetchTopHeroes = async (playerId: string) => {
    const response = await openDotaFetcher(`players/${playerId}/heroes`, '');
    return response;
};

export const fetchHeroStats = async () => {
    const response = await openDotaFetcher(`heroStats`, '');
    return response;
};

export const fetchTopPeers = async (playerId: string) => {
    const response = await openDotaFetcher(`players/${playerId}/peers`, '');
    return response;
};

// Add more functions as needed
