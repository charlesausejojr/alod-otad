"use client"

import React, { useEffect } from 'react'
import { useState } from "react"
import { Plus } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Progress } from '@/components/ui/progress'
// import { PlayerData } from '@/lib/types'

interface Peer {
    id: number
    name: string
    wins: number
    losses: number
    winRate : number
}
  
function Page() {
    const [peers, setPeers] = useState<Peer[]>([
        { id: 1, name: "You", wins: 55, losses: 45, winRate: 0},
        { id: 2, name: "Friend 1", wins: 60, losses: 40, winRate: 0 },
        { id: 3, name: "Friend 2", wins: 48, losses: 52, winRate: 0 },
      ])
      const [newPeerName, setNewPeerName] = useState("")
    
      const addPeer = () => {
        if (newPeerName.trim() !== "") {
          const newPeer: Peer = {
            id: peers.length + 1,
            name: newPeerName.trim(),
            wins: Math.floor(Math.random() * 100),
            losses: Math.floor(Math.random() * 100),
            winRate: 0,
          }
          setPeers([...peers, newPeer])
          setNewPeerName("")
        }
      }

      const calcWinRate = () => {
        const newPeers = peers.map((peer) => {
            const percentage = (peer.wins / (peer.wins + peer.losses)) * 100;
            return {
                ...peer,
                winRate: Number(percentage.toFixed(2)),
            }
        });
        setPeers(newPeers);
      }

      useEffect(() => {
        calcWinRate();
        console.log(peers);
      },[])
    
      return (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">Bubble: Compare Win Rates</h1>
          
          <Card className="mb-6">
            <CardContent className="pt-6">
              <div className="flex space-x-2">
                <Input
                  placeholder="Enter peer name"
                  value={newPeerName}
                  onChange={(e) => setNewPeerName(e.target.value)}
                />
                <Button onClick={addPeer}>
                  <Plus className="mr-2 h-4 w-4" /> Add Peer
                </Button>
              </div>
            </CardContent>
          </Card>
    
          <div className="space-y-2">
            {peers
                .sort((a, b) => b.winRate - a.winRate)
                .map((peer) => {
                    return (
                        <Card key={peer.id} className="overflow-hidden">
                        <CardContent className="p-4 flex items-center">
                            <div className="w-1/4 font-medium truncate">{peer.name}</div>
                            <div className="w-1/4 text-sm text-muted-foreground">{peer.winRate}%</div>
                            <div className="w-1/2 h-6">
                                <Progress value={peer.winRate} className="flex-grow" />
                            </div>
                        </CardContent>
                        </Card>
                )
                })}
          </div>
        </div>
      )
}

export default Page