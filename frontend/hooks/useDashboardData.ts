import { useState, useEffect } from "react";
import { PlayerData, Match, WinLose, PeerStats, HeroStats, Hero } from "@/lib/types";
import { fetchPlayerData, fetchRecentMatches, fetchTopPeers, fetchWinLose, fetchTopHeroes, fetchHeroStats } from "@/app/api/open-dota/openDotaAPI";
import { getTopPeers, getTopHeroes, getModifiedRecentMatches } from "@/lib/utils";
import { usePlayerContext } from "@/context/PlayerContext";

export function useDashboardData(playerId: string) {
  const { setUsername, setProfilePicture } = usePlayerContext();
  const [playerData, setPlayerData] = useState<PlayerData>();
  const [winLose, setWinLose] = useState<WinLose>({ win: 0, lose: 0 });
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [peers, setPeers] = useState<PeerStats[]>([]);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [heroStats, setHeroStats] = useState<HeroStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          playerData,
          recentMatches,
          winLose,
          peers,
          heroes,
          heroStats,
        ] = await Promise.all([
          fetchPlayerData(playerId),
          fetchRecentMatches(playerId),
          fetchWinLose(playerId),
          fetchTopPeers(playerId),
          fetchTopHeroes(playerId),
          fetchHeroStats(),
        ]);

        setPlayerData(playerData);
        setRecentMatches(recentMatches);
        setWinLose(winLose);
        setPeers(peers);
        setHeroes(heroes);
        setHeroStats(heroStats);

        setUsername(playerData.profile.personaname);
        setProfilePicture(playerData.profile.avatar);
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "An unexpected error occurred.";
        console.error(message);
        setError(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [playerId, setUsername, setProfilePicture]);

  const modifiedRecentMatches = getModifiedRecentMatches(recentMatches, heroStats);
  const topHeroes = getTopHeroes(heroes, heroStats);
  const topPeers = getTopPeers(peers);

  return {
    playerData,
    winLose,
    modifiedRecentMatches,
    topHeroes,
    topPeers,
    isLoading,
    error,
  };
}
