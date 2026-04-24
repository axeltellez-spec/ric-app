'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface Function {
  id: number;
  ticker: string;
  name: string;
  description: string;
  category: string;
  imageUrl: string;
}

export default function FavoritesPage() {
  const [favorites, setFavorites] = useState<Function[]>([]);
  const [allFunctions, setAllFunctions] = useState<Function[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        // Load all functions
        const response = await fetch('/data/functions.json');
        const functions: Function[] = await response.json();
        setAllFunctions(functions);

        // Get favorite IDs from localStorage
        const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');

        // Filter functions
        const favoritesFunctions = functions.filter((f) =>
          favoriteIds.includes(f.id)
        );

        setFavorites(favoritesFunctions);
      } catch (error) {
        console.error('Error loading favorites:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFavorites();
  }, []);

  const removeFavorite = (id: number) => {
    const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
    const filtered = favoriteIds.filter((fid: number) => fid !== id);
    localStorage.setItem('favorites', JSON.stringify(filtered));
    setFavorites(favorites.filter((f) => f.id !== id));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-ric-navy border-t-ric-red animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-ric-navy mb-3">
            Mis Favoritos
          </h1>
          <p className="text-lg text-slate-600">
            {favorites.length} {favorites.length === 1 ? 'función guardada' : 'funciones guardadas'}
          </p>
        </div>

        {/* Favorites Grid */}
        {favorites.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {favorites.map((func) => (
              <div
                key={func.id}
                className="bg-white rounded-xl shadow-md overflow-hidden border border-slate-200 hover:border-ric-red hover:shadow-lg transition-all group"
              >
                {/* Image */}
                <div className="relative h-40 bg-gradient-to-br from-ric-navy to-ric-red overflow-hidden">
                  {func.imageUrl ? (
                    <Image
                      src={func.imageUrl}
                      alt={func.name}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-3 py-1 bg-ric-navy text-white text-xs font-bold rounded-full">
                      {func.ticker}
                    </span>
                    <span className="px-3 py-1 bg-slate-100 text-ric-navy text-xs font-medium rounded-full">
                      {func.category}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-ric-navy mb-2 line-clamp-2 group-hover:text-ric-red transition-colors">
                    {func.name}
                  </h3>

                  <p className="text-sm text-slate-600 line-clamp-2 mb-4">
                    {func.description}
                  </p>

                  <div className="flex gap-2">
                    <Link
                      href={`/functions/${func.id}`}
                      className="flex-1 py-2 bg-ric-navy text-white text-center rounded-lg font-semibold text-sm hover:bg-slate-900 transition-colors"
                    >
                      Ver Detalles
                    </Link>
                    <button
                      onClick={() => removeFavorite(func.id)}
                      className="px-4 py-2 bg-red-100 text-ric-red rounded-lg font-semibold text-sm hover:bg-red-200 transition-colors"
                      title="Remover de favoritos"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <svg className="w-16 h-16 mx-auto text-slate-300 mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <h2 className="text-2xl font-bold text-slate-600 mb-2">Sin funciones guardadas</h2>
            <p className="text-slate-500 mb-6">
              Aún no has guardado ninguna función en favoritos.
            </p>
            <Link
              href="/functions"
              className="inline-block px-8 py-3 bg-ric-navy text-white rounded-lg font-semibold hover:bg-slate-900 transition-colors"
            >
              Explorar Funciones
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
