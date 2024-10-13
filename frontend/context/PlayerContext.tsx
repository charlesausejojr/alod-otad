'use client';

import React, { createContext, useContext, useState, ReactNode } from 'react';
import { convertSteam64ToSteam32 } from '@/lib/utils';

interface PlayerContextType {
  playerId: string;
  username: string | undefined;
  profilePicture: string | undefined;
  setPlayerId: (id: string) => void;
  setUsername: (username: string) => void;
  setProfilePicture: (url: string) => void;
}


const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider = ({ children }: { children: ReactNode }) => {
  const steam64ID = "76561198439726456";
  const steam32ID = convertSteam64ToSteam32(steam64ID);
  const [playerId, setPlayerId] = useState<string>(String(steam32ID)); // Default ID for now
  const [username, setUsername] = useState<string>('');
  const [profilePicture, setProfilePicture] = useState<string>('');

  return (
    <PlayerContext.Provider
      value={{ playerId, username, profilePicture, setPlayerId, setUsername, setProfilePicture }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayerContext = () => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayerContext must be used within a PlayerProvider');
  }
  return context;
};
