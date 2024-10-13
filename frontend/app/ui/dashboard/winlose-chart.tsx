import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

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

export default WinLoseChart;