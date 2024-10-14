import React from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { FilteredMatch } from "@/lib/types";

function RecentMatches({ matches }: { matches: FilteredMatch[] }) {
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
                  <div className='flex items-center space-x-5'>
                    <Avatar>
                      <AvatarImage className="object-cover" src={match.src} alt="User avatar" />
                      <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <span>{match.hero_name}</span>
                  </div>
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
                    className="h-8 min-w-24"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={[match]} layout="vertical">
                        <XAxis type="number" hide />
                        <YAxis type="category" hide />
                        <Bar dataKey="kills" stackId="a" fill="var(--color-kills)" radius={[5, 0, 0 , 5]}/>
                        <Bar dataKey="deaths" stackId="a" fill="var(--color-deaths)" />
                        <Bar dataKey="assists" stackId="a" fill="var(--color-assists)" radius={[0, 5, 5, 0]}/>
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

export default RecentMatches
