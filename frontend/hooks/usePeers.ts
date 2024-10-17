import { useEffect, useState } from 'react';
import { Peer } from '@/lib/types';
import { fetchPlayerData, fetchWinLose } from '@/app/api/open-dota/openDotaAPI';
import { convertSteam64ToSteam32 } from '@/lib/utils';

export const usePeers = () => {
  const [peers, setPeers] = useState<Peer[]>([]);
  
  const fetchPeers = async () => {
    try {
      const response = await fetch('/api/peers');
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to fetch data');
      }
      const data: Peer[] = await response.json();
      console.log(data);
      setPeers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const addPeer = async (newPeerID: string) => {
    const steam32ID = String(convertSteam64ToSteam32(newPeerID));
    if (newPeerID.trim() !== "") {
      const [winLose, playerData] = await Promise.all([
        fetchWinLose(steam32ID),
        fetchPlayerData(steam32ID)
      ]);

      const newPeer: Peer = {
        steamId: Number(newPeerID),
        name: playerData.profile.personaname,
        wins: winLose.win,
        losses: winLose.lose,
        img: playerData.profile.avatarfull ?? playerData.prfile.avatar
      };

      try {
        const response = await fetch('/api/peers', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(newPeer),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to add peer');
        }
        fetchPeers(); // Refresh peers after adding a new one
      } catch (error) {
        console.error('Error adding peer:', error);
      }
    }
  };

  const deletePeer = async (id: number) => {
    try {
      const response = await fetch(`/api/peers/${id}`, { method: 'DELETE' });

      if (!response.ok) {
        throw new Error('Failed to delete peer');
      }

      setPeers(peers.filter(peer => peer.steamId !== id)); // Update state
    } catch (error) {
      console.error('Error deleting peer:', error);
    }
  };

  const refreshPeers = async () => {
    try {
      const updatedPeers = await Promise.all(
        peers.map(async (peer) => {
          const steam32ID = String(convertSteam64ToSteam32(peer.steamId));
          const winLose = await fetchWinLose(steam32ID);
          const updatedPeer = {
            ...peer,
            wins: winLose.win,
            losses: winLose.lose
          };

          await fetch(`/api/peers/${peer.steamId}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(updatedPeer),
          });

          return updatedPeer;
        })
      );

      setPeers(updatedPeers);
    } catch (error) {
      console.error('Error refreshing bubble:', error);
    }
  };

  useEffect(() => {
    fetchPeers(); // Fetch peers on initial render
  }, []);

  return {
    peers,
    addPeer,
    deletePeer,
    refreshPeers,
  };
};
