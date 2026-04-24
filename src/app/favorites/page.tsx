'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useFavorites } from '@/hooks/useFavorites';

interface Function {
  id: string | number;
  ticker?: string;
  codigo?: string;
  name?: string;
  nombre?: string;
  description?: string;
  descripcion?: string;
  category?: string;
  categoria?: string;
  imageUrl?: string;
  imagen?: string;
}

export default function FavoritesPage() {
  const [functions, setFunctions] = useState<Function[]>([]);
  const [loading, setLoading] = useState(true);
  const { favorites, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadFunctions = async () => {
      try {
        const response = await fetch('/data/functions.json');
        const data = await response.json();
        const functionsData = Array.isArray(data) ? data : (data.functions || []);
        setFunctions(functionsData);
      } catch (error) {
        console.error('Error loading functions:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFunctions();
  }, []);

  const favoritesFunctions = functions.filter((f) => favorites.includes(f.id));

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 rounded-full border-4 border-ric-navy border-t-ric-red animate-spin mx-auto mb-4"></div>
          <p className="text-slate-600">Cargando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-10">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold text-ric-navy mb-3">
            Mis Favoritos ♥
          </h1>
          <p className="text-lg text-slate-600">
            {favoritesFunctions.length} {favoritesFunctions.length === 1 ? 'función guardada' : 'funciones guardadas'}
          </p>
        </div>

        {/* Favorites Grid */}
        {favoritesFunctions.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoritesFunctions.map((func) => (
              <Link key={func.id} href={`/functions/${func.id}`}>
                <div className="group h-full bg-white rounded-xl shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border-2 border-slate-200 hover:border-ric-red cursor-pointer">
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ric-red via-ric-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                  <div className="p-5">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        <span className="inline-block px-3 py-1 bg-ric-navy text-white text-xs font-bold rounded-full">
                          {func.ticker || func.codigo || 'N/A'}
                        </span>
                        <span className="inline-block px-3 py-1 bg-slate-100 text-ric-navy text-xs font-medium rounded-full">
                          {func.category || func.categoria || 'General'}
                        </span>
                      </div>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          toggleFavorite(func.id);
                        }}
                        className="transition-all hover:scale-110"
                        title="Remover de favoritos"
                      >
                        <span className="text-xl text-ric-red">♥</span>
                      </button>
                    </div>

                    <h3 className="text-lg font-bold text-ric-navy mb-2 group-hover:text-ric-red transition-colors line-clamp-2">
                      {func.name || func.nombre || 'Sin nombre'}
                    </h3>

                    <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                      {func.description || func.descripcion || 'Sin descripción disponible'}
                    </p>

                    <div className="flex items-center text-ric-red font-semibold text-sm group-hover:gap-2 transition-all">
                      Ver detalles
                      <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <svg className="w-12 h-12 mx-auto text-slate-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
            <p className="text-slate-600 font-medium">No tienes favoritos guardados</p>
            <p className="text-sm text-slate-500 mb-6">Agrega funciones a favoritos para verlas aquí</p>
            <Link href="/functions" className="inline-block px-6 py-3 bg-ric-red text-white font-bold rounded-lg hover:bg-red-700 transition-colors">
              Explorar Funciones
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
