'use client';

import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favoriteClubs, setFavoriteClubs] = useState<string[]>([]);
  const [favoritePlayers, setFavoritePlayers] = useState<string[]>([]);

  useEffect(() => {
    const clubs = localStorage.getItem('favoriteClubs');
    const players = localStorage.getItem('favoritePlayers');
    if (clubs) setFavoriteClubs(JSON.parse(clubs));
    if (players) setFavoritePlayers(JSON.parse(players));
  }, []);

  const toggleFavoriteClub = (clubId: string) => {
    setFavoriteClubs((prev) => {
      const updated = prev.includes(clubId)
        ? prev.filter((id) => id !== clubId)
        : [...prev, clubId];
      localStorage.setItem('favoriteClubs', JSON.stringify(updated));
      return updated;
    });
  };

  const toggleFavoritePlayer = (playerId: string) => {
    setFavoritePlayers((prev) => {
      const updated = prev.includes(playerId)
        ? prev.filter((id) => id !== playerId)
        : [...prev, playerId];
      localStorage.setItem('favoritePlayers', JSON.stringify(updated));
      return updated;
    });
  };

  return {
    favoriteClubs,
    favoritePlayers,
    toggleFavoriteClub,
    toggleFavoritePlayer,
    isFavoriteClub: (id: string) => favoriteClubs.includes(id),
    isFavoritePlayer: (id: string) => favoritePlayers.includes(id),
  };
}
