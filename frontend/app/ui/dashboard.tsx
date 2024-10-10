"use client"

import { useState, useEffect } from "react"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, Home, User, BarChart2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

type Match = {
    match_id: number;
    player_slot: number;
    radiant_win: boolean;
    duration: number;
    game_mode: number;
    lobby_type: number;
    hero_id: number;
    start_time: number;
    version: number | null;
    kills: number;
    deaths: number;
    assists: number;
    skill: number | null;
    average_rank: number | null;
    leaver_status: number;
    party_size: number | null;
    hero_variant: number | null;
};

// Define route structure
interface Route {
  name: string
  path: string
  icon: React.ElementType
}

// Define routes
const routes: Route[] = [
  { name: "Dashboard", path: "/", icon: Home },
  { name: "Profile", path: "/profile", icon: User },
  { name: "Statistics", path: "/statistics", icon: BarChart2 },
]

// Sidenav component
function Sidenav() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={`flex flex-col h-screen bg-background border-r transition-all duration-300 ${isCollapsed ? "w-16" : "w-64"}`}>
      <div className="flex items-center justify-end p-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsCollapsed(!isCollapsed)}
          aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
        >
          {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>
      <nav className="flex-1">
        <ul className="space-y-2 px-2">
          {routes.map((route) => {
            const Icon = route.icon
            return (
              <li key={route.path}>
                <a href={route.path} className={`flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors ${
                  pathname === route.path ? "bg-muted text-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}>
                  <Icon className="h-5 w-5" />
                  {!isCollapsed && <span>{route.name}</span>}
                </a>
              </li>
            )
          })}
        </ul>
      </nav>
    </div>
  )
}

// WinLoseChart component
function WinLoseChart({ wins, losses }: { wins: number; losses: number }) {
  const data = [
    { name: "Wins", value: wins, color: "#4ade80"},
    { name: "Losses", value: losses, color: "#f87171"},
  ]
  const winRate = ((wins / (wins + losses)) * 100).toFixed(2)

  return (
    <Card>
      <CardHeader>
        <CardTitle>Win/Lose</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-64 w-full">
            <ChartContainer 
                config={{
                // Additional config if needed
                }}
                className="h-full w-full"
                >
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            dataKey="value"
                            data={data}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            paddingAngle={5}
                        >
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                        </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                </ResponsiveContainer>
            </ChartContainer>
        </div>
        <div className="text-center mt-4">
          <p className="text-2xl font-bold">{winRate}%</p>
          <p className="text-muted-foreground">Win Rate</p>
        </div>
      </CardContent>
    </Card>
  )
}

// TopList component
function TopList({ title, items }: { title: string; items: { name: string; percentage: number }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <span>{item.name}</span>
              <div className="flex items-center space-x-2 w-1/2">
                <Progress value={item.percentage} className="flex-grow" />
                <span className="text-sm text-muted-foreground">{item.percentage.toFixed(2)}%</span>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}

  
// RecentMatches component
function RecentMatches({ matches }: { matches: Match[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Matches</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hero</TableHead>
              <TableHead>Result</TableHead>
              <TableHead>Game Mode</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>K/D/A</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {matches.map((match, index) => (
              <TableRow key={index}>
                <TableCell>
                  {/*<img
                    src={`https://api.opendota.com${match.hero_img}`}
                    alt={match.hero_name}
                    className="w-8 h-8 rounded-full"
                  />*/}

                </TableCell>
                <TableCell className={match.player_slot < 128 === match.radiant_win ? "text-green-500" : "text-red-500"}>
                  {match.player_slot < 128 === match.radiant_win ? "Win" : "Loss"}
                </TableCell>
                <TableCell>{match.game_mode}</TableCell>
                <TableCell>{Math.floor(match.duration / 60)}:{(match.duration % 60).toString().padStart(2, '0')}</TableCell>
                <TableCell>
                  <ChartContainer
                    config={{
                      kills: {
                        label: "Kills",
                        color: "#4ade80",
                      },
                      deaths: {
                        label: "Deaths",
                        color: "#f87171",
                      },
                      assists: {
                        label: "Assists",
                        color: "hsl(var(--chart-3))",
                      },
                    }}
                    className="h-10 max-w-24"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[match]} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis type="category" hide />
                        <Bar dataKey="kills" stackId="a" fill="var(--color-kills)" radius={[4, 0, 0 , 4]}/>
                        <Bar dataKey="deaths" stackId="a" fill="var(--color-deaths)" />
                        <Bar dataKey="assists" stackId="a" fill="var(--color-assists)" radius={[0, 4, 4, 0]}/>
                        <ChartTooltip wrapperStyle={{zIndex: 10000}} content={<ChartTooltipContent />} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

// Main Dashboard component
export default function Dashboard() {
  const [playerData, setPlayerData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
        setPlayerData(
            {
                "solo_competitive_rank": 4500,
                "competitive_rank": 4600,
                "rank_tier": 81,
                "leaderboard_rank": 125,
                "profile": {
                  "account_id": 123456789,
                  "personaname": "420 booty wizard",
                  "name": "John Doe",
                  "plus": true,
                  "cheese": 10,
                  "steamid": "76561198012345678",
                  "avatar": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ab/abcdef1234567890.jpg",
                  "avatarmedium": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ab/abcdef1234567890_medium.jpg",
                  "avatarfull": "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/ab/abcdef1234567890_full.jpg",
                  "profileurl": "https://steamcommunity.com/id/420bootywizard/",
                  "last_login": "2024-10-10T14:35:00Z",
                  "loccountrycode": "US",
                  "is_contributor": false,
                  "is_subscriber": true
                }
              }
        );
        setIsLoading(false);

        /* 
        try {
        k
            // Replace with actual player ID
            const playerId = "76561198028175941"
            const response = await fetch(`https://api.opendota.com/api/players/${playerId}`)
            const data = await response.json()
            setPlayerData(data)
            setIsLoading(false)
        } catch (error) {
            console.error("Error fetching player data:", error)
            setIsLoading(false)
        }
        */
    }

    fetchData()
  }, [])

  if (isLoading) {
    return <div>Loading...</div>
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

  const recentMatches = [
    {
        "match_id": 3703866531,
        "player_slot": 0,
        "radiant_win": true,
        "duration": 0,
        "game_mode": 0,
        "lobby_type": 0,
        "hero_id": 0,
        "start_time": 0,
        "version": 0,
        "kills": 10,
        "deaths": 4,
        "assists": 3,
        "skill": 0,
        "average_rank": 0,
        "leaver_status": 0,
        "party_size": 0,
        "hero_variant": 0
    },
    {
        "match_id": 3703866531,
        "player_slot": 0,
        "radiant_win": true,
        "duration": 0,
        "game_mode": 0,
        "lobby_type": 0,
        "hero_id": 0,
        "start_time": 0,
        "version": 0,
        "kills": 3,
        "deaths": 4,
        "assists": 5,
        "skill": 0,
        "average_rank": 0,
        "leaver_status": 0,
        "party_size": 0,
        "hero_variant": 0
    },
  ]

  return (
    <div className="flex h-screen bg-background">
      <main className="flex-1 overflow-y-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <WinLoseChart wins={506} losses={508} />
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