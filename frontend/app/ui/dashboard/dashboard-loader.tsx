import { Loader2 } from "lucide-react"

export default function DashboardLoader() {
  return (
    <div className="flex h-screen w-full items-center justify-center bg-background">
      <div className="text-center">
        <Loader2 className="h-16 w-16 animate-spin text-primary mx-auto mb-4" />
        <h2 className="text-2xl font-semibold mb-2">Loading Dashboard</h2>
        <p className="text-muted-foreground">Please wait while we fetch your data...</p>
      </div>
    </div>
  )
}