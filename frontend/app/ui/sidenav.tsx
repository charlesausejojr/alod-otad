'use client';

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { ChevronLeft, ChevronRight, Home, Settings, Users } from "lucide-react"
import Image from "next/image";

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

// Define the structure for our route objects
interface Route {
  name: string
  path: string
  icon: React.ElementType
}

// Define our routes
const routes: Route[] = [
  { name: "Home", path: "/", icon: Home },
  { name: "Users", path: "/users", icon: Users },
  { name: "Settings", path: "/settings", icon: Settings },
  // Add more routes here as needed
]

export default function Sidenav() {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()

  return (
    <div className={cn(
      "flex flex-col h-screen bg-background border-r transition-all duration-300",
      isCollapsed ? "w-16" : "w-64"
    )}>
        <div className="flex items-center justify-center p-4">
            <Image
                className="mt-4"
                src="/dota.png"
                alt="dota-logo"
                width={40}
                height={40}
            />
        </div>
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
                    <Link href={route.path}>
                    <span className={cn(
                        "flex items-center space-x-2 rounded-lg px-3 py-2 transition-colors",
                        pathname === route.path
                        ? "bg-muted text-foreground"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}>
                        <Icon className="h-5 w-5" />
                        {!isCollapsed && <span>{route.name}</span>}
                    </span>
                    </Link>
                </li>
                )
            })}
            </ul>
        </nav>
    </div>
  )
}