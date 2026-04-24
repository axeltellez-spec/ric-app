import { useState, useEffect } from 'react';

export function useFavorites() {
  const [favorites, setFavorites] = useState<(string | number)[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on component mount
  useEffect(() => {
    try {
      if (typeof window !== 'undefined') {
        const stored = localStorage.getItem('ric-favorites');
        if (stored) {
          setFavorites(JSON.parse(stored));
        }
      }
    } catch (error) {
      console.error('Error loading favorites from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Toggle favorite status
  const toggleFavorite = (id: string | number) => {
    setFavorites((prev) => {
      const updated = prev.includes(id)
        ? prev.filter((fav) => fav !== id)
        : [...prev, id];
      
      // Save to localStorage
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('ric-favorites', JSON.stringify(updated));
        }
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
      
      return updated;
    });
  };

  // Check if an item is in favorites
  const isFavorite = (id: string | number) => favorites.includes(id);

  // Add to favorites
  const addFavorite = (id: string | number) => {
    if (!favorites.includes(id)) {
      toggleFavorite(id);
    }
  };

  // Remove from favorites
  const removeFavorite = (id: string | number) => {
    if (favorites.includes(id)) {
      toggleFavorite(id);
    }
  };

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    addFavorite,
    removeFavorite,
    isLoaded,
  };
}
