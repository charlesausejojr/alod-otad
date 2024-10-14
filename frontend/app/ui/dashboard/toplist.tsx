import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

// TopList component
function TopList({ title, items }: { title: string; items: { name: string; percentage: number, src : string }[] }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {items.map((item, index) => (
            <li key={index} className="flex items-center justify-between">
              <div className="flex items-center space-x-5">
                <Avatar>
                  <AvatarImage className="object-cover" src={item.src} alt="User avatar" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <span>{item.name}</span>
              </div>
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

export default TopList;