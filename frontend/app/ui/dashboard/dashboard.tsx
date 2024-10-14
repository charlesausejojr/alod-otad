"use client"

import { useState, useEffect } from "react"
import { PlayerData, Match, WinLose, PeerStats, HeroStats, Hero } from "@/lib/types"
import { usePlayerContext } from '@/context/PlayerContext';
import DashboardLoader from "./dashboard-loader"
import RecentMatches from "./recentmatches"
import WinLoseChart from "./winlose-chart"
import TopList from "./toplist"
import { fetchPlayerData, fetchRecentMatches, fetchTopPeers, fetchWinLose, fetchTopHeroes, fetchHeroStats } from "@/app/api/openDotaAPI";
import { getTopPeers, getTopHeroes, getModifiedRecentMatches } from "@/lib/utils";

// Main Dashboard component
export default function Dashboard() {
  const { playerId, setUsername, setProfilePicture } = usePlayerContext();
  const [playerData, setPlayerData] = useState<PlayerData>();
  const [winLose, setWinLose] = useState<WinLose>({win: 0, lose: 0});
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [peers, setPeers] = useState<PeerStats[]>([]);
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [heroStats, setHeroStats] = useState<HeroStats[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playerData, recentMatches, winLose, peers, heroes, heroStats] = await Promise.all([
          fetchPlayerData(playerId),
          fetchRecentMatches(playerId),
          fetchWinLose(playerId),
          fetchTopPeers(playerId),
          fetchTopHeroes(playerId),
          fetchHeroStats()
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
        const message = (err instanceof Error) ? err.message : 'An unexpected error occurred.';
        console.error(message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [playerId, setUsername, setProfilePicture]);

  if (isLoading) {
    return  <DashboardLoader/>
  }

  if (!playerData) {
    return <div>Error loading player data</div>
  }

  const modifiedRecentMatches = getModifiedRecentMatches(recentMatches, heroStats);

  const topHeroes = getTopHeroes(heroes, heroStats);

  const topPeers = getTopPeers(peers); 

  console.log(topHeroes);

  return (
    <div className="flex h-screen w-full bg-background">
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WinLoseChart wins={winLose?.win} losses={winLose?.lose} />
          {/*<WinLoseChart wins={playerData.win} losses={playerData.lose} /> */}
          <TopList title="Top 5 Heroes" items={topHeroes} />
          <TopList title="Top 5 Peers" items={topPeers} />
        </div>
        <div className="mt-6">
          <RecentMatches matches={modifiedRecentMatches} />
        </div>
      </main>
    </div>
  )
}