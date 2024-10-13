"use client"

import { useState, useEffect } from "react"
import { PlayerData, Match, WinLose } from "@/lib/types"
import { usePlayerContext } from '@/context/PlayerContext';
import DashboardLoader from "./dashboard-loader"
import RecentMatches from "./recentmatches"
import WinLoseChart from "./winlose-chart"
import TopList from "./toplist"
import { fetchPlayerData, fetchRecentMatches, fetchWinLose } from "@/app/api/openDotaAPI";

// Main Dashboard component
export default function Dashboard() {
  const { playerId, setUsername, setProfilePicture } = usePlayerContext();
  const [playerData, setPlayerData] = useState<PlayerData>();
  const [winLose, setWinLose] = useState<WinLose>({win: 0, lose: 0});
  const [recentMatches, setRecentMatches] = useState<Match[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [playerData, recentMatches, winLose] = await Promise.all([
          fetchPlayerData(playerId),
          fetchRecentMatches(playerId),
          fetchWinLose(playerId)
          // fetchTopHeroes(playerId),
        ]);

        setPlayerData(playerData);
        setRecentMatches(recentMatches);
        setWinLose(winLose);
        console.log(winLose);
        // setTopHeroes(topHeroes);
        
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

  /*
  if (!playerData) {
    return <div>Error loading player data</div>
  }
    */

  // Mock data for demonstration purposes
  const topHeroes = [
    { name: "Anti-Mage", percentage: 65.5 },
    { name: "Invoker", percentage: 60.2 },
    { name: "Shadow Fiend", percentage: 58.7 },
    { name: "Pudge", percentage: 55.3 },
    { name: "Mirana", percentage: 53.1 },
  ]

  const topPeers = [
    { name: "Player1", percentage: 70.2 },
    { name: "Player2", percentage: 65.8 },
    { name: "Player3", percentage: 62.4 },
    { name: "Player4", percentage: 59.1 },
    { name: "Player5", percentage: 57.6 },
  ]

  console.log(playerData);

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
          <RecentMatches matches={recentMatches} />
        </div>
      </main>
    </div>
  )
}