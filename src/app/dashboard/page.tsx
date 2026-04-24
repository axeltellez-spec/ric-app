'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

interface Function {
  id: number;
  ticker: string;
  name: string;
  category: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState({
    totalFunctions: 0,
    totalFavorites: 0,
    categories: 0,
  });
  const [recentFavorites, setRecentFavorites] = useState<Function[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDashboardData = async () => {
      try {
        const response = await fetch('/data/functions.json');
        const functions: Function[] = await response.json();

        const favoriteIds = JSON.parse(localStorage.getItem('favorites') || '[]');
        const favorites = functions.filter((f) => favoriteIds.includes(f.id));
        const categories = new Set(functions.map((f) => f.category)).size;

        setStats({
          totalFunctions: functions.length,
          totalFavorites: favorites.length,
          categories,
        });

        setRecentFavorites(favorites.slice(0, 5));
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    loadDashboardData();
  }, []);

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
        {/* Welcome */}
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-ric-navy mb-3">
            Dashboard
          </h1>
          <p className="text-lg text-slate-600">
            Bienvenido al panel de control del Explorador de Funciones Bloomberg
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {/* Total Functions */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Total de Funciones
                </p>
                <p className="text-4xl font-bold text-ric-navy">{stats.totalFunctions}</p>
              </div>
              <div className="w-14 h-14 bg-ric-navy rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Favorites Count */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Funciones Favoritas
                </p>
                <p className="text-4xl font-bold text-ric-red">{stats.totalFavorites}</p>
              </div>
              <div className="w-14 h-14 bg-ric-red rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white fill-current" viewBox="0 0 24 24">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                </svg>
              </div>
            </div>
          </div>

          {/* Categories */}
          <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-wide mb-2">
                  Categorías
                </p>
                <p className="text-4xl font-bold text-ric-navy">{stats.categories}</p>
              </div>
              <div className="w-14 h-14 bg-ric-navy rounded-lg flex items-center justify-center">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Favorites Section */}
        <div className="bg-white rounded-xl shadow-md border border-slate-200 p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-ric-navy">
              {recentFavorites.length > 0 ? 'Favoritos Recientes' : 'Sin Favoritos Aún'}
            </h2>
            <Link
              href="/favorites"
              className="text-ric-red font-semibold hover:text-ric-navy transition-colors"
            >
              Ver Todos →
            </Link>
          </div>

          {recentFavorites.length > 0 ? (
            <div className="space-y-3">
              {recentFavorites.map((func) => (
                <Link
                  key={func.id}
                  href={`/functions/${func.id}`}
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-slate-50 to-white rounded-lg border border-slate-200 hover:border-ric-red hover:bg-gradient-to-r hover:from-slate-100 hover:to-red-50 transition-all group"
                >
                  <div>
                    <h3 className="font-bold text-ric-navy group-hover:text-ric-red transition-colors">
                      {func.name}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="px-2 py-0.5 bg-ric-navy text-white text-xs font-bold rounded">
                        {func.ticker}
                      </span>
                      <span className="text-xs text-slate-600">{func.category}</span>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-slate-400 group-hover:text-ric-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-slate-500 mb-4">
                Aún no has guardado ninguna función en favoritos.
              </p>
              <Link
                href="/functions"
                className="inline-block px-6 py-2 bg-ric-navy text-white rounded-lg font-semibold hover:bg-slate-900 transition-colors"
              >
                Explorar Funciones
              </Link>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          <Link
            href="/functions"
            className="p-8 bg-white rounded-xl shadow-md border border-slate-200 hover:border-ric-navy hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-ric-navy mb-1">
                  Explorar Funciones
                </h3>
                <p className="text-sm text-slate-600">
                  Busca y descubre nuevas funciones
                </p>
              </div>
              <svg className="w-10 h-10 text-ric-navy group-hover:text-ric-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </Link>

          <Link
            href="/favorites"
            className="p-8 bg-white rounded-xl shadow-md border border-slate-200 hover:border-ric-red hover:shadow-lg transition-all group"
          >
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-bold text-ric-navy mb-1">
                  Mis Favoritos
                </h3>
                <p className="text-sm text-slate-600">
                  Accede a tus funciones guardadas
                </p>
              </div>
              <svg className="w-10 h-10 text-ric-red" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
