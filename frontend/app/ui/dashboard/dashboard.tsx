"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import DashboardLoader from "./dashboard-loader";
import RecentMatches from "./recentmatches";
import WinLoseChart from "./winlose-chart";
import TopList from "./toplist";
import { usePlayerContext } from "@/context/PlayerContext";

export default function Dashboard() {
  const { playerId } = usePlayerContext();
  const {
    playerData,
    winLose,
    modifiedRecentMatches,
    topHeroes,
    topPeers,
    isLoading,
    error,
  } = useDashboardData(playerId);

  if (isLoading) {
    return <DashboardLoader />;
  }

  if (error) {
    return <div>Error loading player data: {error}</div>;
  }

  if (!playerData) {
    return <div>No player data found</div>;
  }

  return (
    <div className="flex h-screen w-full bg-background">
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WinLoseChart wins={winLose.win} losses={winLose.lose} />
          <TopList title="Top 5 Heroes" items={topHeroes} />
          <TopList title="Top 5 Peers" items={topPeers} />
        </div>
        <div className="mt-6">
          <RecentMatches matches={modifiedRecentMatches} />
        </div>
      </main>
    </div>
  );
}
