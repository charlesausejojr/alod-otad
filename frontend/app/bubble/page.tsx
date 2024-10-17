"use client"

import React, { useState } from 'react';
import { Plus, RefreshCw, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Progress } from '@/components/ui/progress';
import { usePeers } from '@/hooks/usePeers';

function Page() {
  const { peers, addPeer, deletePeer, refreshPeers } = usePeers();
  const [newPeerID, setNewPeerID] = useState("");

  const handleAddPeer = () => {
    addPeer(newPeerID);
    setNewPeerID(""); // Clear the input field
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Bubble: Compare Win Rates</h1>
      
      <Card className="mb-6">
          <CardContent className="pt-6">
          <div className="flex space-x-2">
            <Input
              placeholder="Enter SteamID"
              value={newPeerID}
              onChange={(e) => setNewPeerID(e.target.value)}
            />
            <Button onClick={handleAddPeer}>
              <Plus className="mr-2 h-4 w-4" /> Add Peer
            </Button>
            <Button variant="outline" onClick={refreshPeers}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="space-y-2">
        {peers
          .sort((a, b) => (b.winRate ?? 0) - (a.winRate ?? 0))
          .map((peer) => (
            <Card key={peer.steamId} className="overflow-hidden">
              <CardContent className="p-4 flex items-center">
                <div className='w-1/4 flex items-center space-x-4'>
                  <div className='avatar-fire'>
                    <Avatar>
                      <AvatarImage src={peer.img} alt={peer.name} />
                      <AvatarFallback>{peer.name.slice(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </div>
                  <div className="font-medium">{peer.name}</div>
                </div>
                <div className="w-1/4 text-sm text-muted-foreground">{peer.winRate}%</div>
                <div className="w-1/2 h-6">
                  <Progress value={peer.winRate} className="flex-grow" />
                </div>
                <div className="flex items-center justify-end">
                  <Button 
                    variant="ghost" 
                    size="icon"
                    onClick={() => deletePeer(peer.steamId)}
                    className="ml-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
      </div>
    </div>
  );
}

export default Page;
