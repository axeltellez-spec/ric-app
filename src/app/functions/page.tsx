'use client';

import React, { useState, useMemo, useEffect } from 'react';
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
  palabrasClaves?: string[];
}

export default function FunctionsPage() {
  const [functions, setFunctions] = useState<Function[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewAllMode, setViewAllMode] = useState(false);
  const { toggleFavorite, isFavorite } = useFavorites();

  // Load functions from public/data/functions.json
  useEffect(() => {
    const loadFunctions = async () => {
      try {
        const response = await fetch('/data/functions.json');
        const data = await response.json();
        const functionsData = Array.isArray(data) ? data : (data.functions || []);
        setFunctions(functionsData);
      } catch (error) {
        console.error('Error loading functions:', error);
        setFunctions([]);
      }
    };

    loadFunctions();
  }, []);

  // Normalize functions
  const normalizedFunctions = useMemo(
    () =>
      functions.map((f) => ({
        ...f,
        ticker: f.ticker || f.codigo || '',
        name: f.name || f.nombre || '',
        description: f.description || f.descripcion || '',
        category: f.category || f.categoria || '',
        imageUrl: f.imageUrl || f.imagen || '',
      })),
    [functions]
  );

  // Function to remove accents and normalize text for searching
  const removeAccents = (text: string): string => {
    return text
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .trim();
  };

  // Filtered functions based on search and category
  const filteredFunctions = useMemo(() => {
    if (!searchTerm.trim()) {
      return normalizedFunctions.filter(
        (func) =>
          selectedCategories.length === 0 ||
          selectedCategories.includes(func.category)
      );
    }

    const searchNormalized = removeAccents(searchTerm);

    return normalizedFunctions.filter((func) => {
      const matchesSearch =
        removeAccents(func.name).includes(searchNormalized) ||
        removeAccents(func.ticker).includes(searchNormalized) ||
        removeAccents(func.description).includes(searchNormalized) ||
        (Array.isArray(func.palabrasClaves) &&
          func.palabrasClaves.some((keyword: string) =>
            removeAccents(keyword).includes(searchNormalized)
          ));

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(func.category);

      return matchesSearch && matchesCategory;
    });
  }, [normalizedFunctions, searchTerm, selectedCategories]);

  const categoryInfo: Record<string, { description: string }> = {
    'Acciones': {
      description: 'Datos y análisis de mercado de renta variable'
    },
    'Derivados & Valoración': {
      description: 'Precios, riesgo y valoración de derivados'
    },
    'Economía & Macro': {
      description: 'Indicadores económicos y análisis macro'
    },
    'Noticias': {
      description: 'Noticias, eventos y análisis de mercado'
    },
    'Renta Fija & Crédito': {
      description: 'Bonos, crédito y análisis de renta fija'
    }
  };

  const getCategoryIcon = (category: string) => {
    const icons: Record<string, React.ReactNode> = {
      'Acciones': (
        <svg className="w-8 h-8 text-ric-red" fill="currentColor" viewBox="0 0 24 24">
          <path d="M3 13h2v8H3zm4-8h2v16H7zm4-2h2v18h-2zm4 4h2v14h-2zm4-1h2v15h-2z" />
        </svg>
      ),
      'Derivados & Valoración': (
        <svg className="w-8 h-8 text-purple-600" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="10" strokeWidth="2" fill="none" stroke="currentColor" />
          <path strokeWidth="2" stroke="currentColor" d="M12 6v6l4 2" fill="none" />
        </svg>
      ),
      'Economía & Macro': (
        <svg className="w-8 h-8 text-blue-600" fill="currentColor" viewBox="0 0 24 24">
          <circle cx="12" cy="12" r="9" strokeWidth="2" fill="none" stroke="currentColor" />
          <path strokeWidth="2" stroke="currentColor" d="M12 2a10 10 0 0 1 0 20M2 12h20" />
        </svg>
      ),
      'Noticias': (
        <svg className="w-8 h-8 text-ric-red" fill="currentColor" viewBox="0 0 24 24">
          <rect x="3" y="5" width="18" height="14" rx="2" strokeWidth="2" fill="none" stroke="currentColor" />
          <line x1="3" y1="10" x2="21" y2="10" strokeWidth="2" stroke="currentColor" />
          <line x1="3" y1="14" x2="18" y2="14" strokeWidth="2" stroke="currentColor" />
        </svg>
      ),
      'Renta Fija & Crédito': (
        <svg className="w-8 h-8 text-purple-700" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2c5.523 0 10 4.477 10 10s-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2zm0 2a8 8 0 100 16 8 8 0 000-16z" />
          <path d="M12 6v6l4 2" strokeWidth="2" stroke="currentColor" fill="none" />
        </svg>
      )
    };
    return icons[category] || <div className="w-8 h-8" />;
  };

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const categories = Array.from(new Set(normalizedFunctions.map((f) => f.category))).sort();
  const mainCategories = categories.slice(0, 5);

  // Determine if we should show categories (only if no search term AND no categories are selected, OR categories are selected)
  // Hide categories when user is searching without pre-selected categories or when in viewAllMode
  const hasSearchTerm = searchTerm.trim().length > 0;
  const shouldShowCategories = !viewAllMode && (!hasSearchTerm || selectedCategories.length > 0);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-6 py-0 -mt-12">
        {/* Top section with badge, title, description and monitor */}
        <div className="grid grid-cols-3 gap-4 -mb-2 items-center">
          {/* Left section - Content */}
          <div className="col-span-2">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-red-50 px-4 py-2 rounded-lg mb-2">
              <svg className="w-5 h-5 text-ric-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <rect x="2" y="3" width="20" height="14" rx="2" strokeWidth="2" />
                <path strokeWidth="2" d="M8 21h8M12 17v4" />
              </svg>
              <span className="text-xs font-bold text-ric-red uppercase tracking-wider">Bloomberg Terminal</span>
            </div>

            {/* Title */}
            <h1 className="text-5xl font-bold text-ric-navy mb-2 leading-tight">
              Funciones Bloomberg Terminal
            </h1>

            {/* Description */}
            <p className="text-slate-600 text-base mb-2 leading-relaxed max-w-2xl">
              Accede a las herramientas más poderosas de Bloomberg Terminal. Explora por categoría y descubre funciones avanzadas para análisis financiero profesional.
            </p>

            {/* Red divider */}
            <div className="h-1 w-14 bg-gradient-to-r from-ric-red to-purple-600 rounded-full mb-4"></div>
          </div>

          {/* Right section - Monitor */}
          <div className="col-span-1 flex items-center justify-center h-full min-h-96">
            <div className="w-full max-w-sm flex justify-center items-center">
              <img
                src="/images/acel.png"
                alt="Bloomberg Terminal Interface"
                className="w-full h-auto object-contain"
              />
            </div>
          </div>
        </div>

        {/* Search Section - Full Width */}
        <div className="-mb-8 -mx-6 mt-32">
          <div className="flex items-center gap-3 mb-3 px-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
              <svg className="w-6 h-6 text-ric-red" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold text-ric-navy">Buscar Funciones</h2>
              <p className="text-sm text-slate-600">Busca funciones Bloomberg por nombre, código ticker o descripción</p>
            </div>
          </div>

          {/* Custom Search Input - Full Width */}
          <div className="flex gap-3 px-6">
            <input
              type="text"
              placeholder="Escribe el nombre de una función, ticker o palabra clave..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 px-5 py-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:border-ric-navy text-slate-700"
            />
            <button className="px-8 py-3 bg-gradient-to-r from-ric-red to-purple-600 hover:from-red-700 hover:to-purple-700 text-white font-bold rounded-lg transition-all flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
        </div>

        {/* Categories Section - Full Width - Show only if no search OR categories selected */}
        {shouldShowCategories && (
          <div className="-mx-6 mb-6 transition-all duration-300 mt-0">
            <div className="flex items-center justify-between mb-6 px-6">
              <h2 className="text-xl font-bold text-ric-navy flex items-center gap-2">
                <svg className="w-5 h-5 text-ric-red" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM15 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM5 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z" />
                </svg>
                Filtrar por categoría
              </h2>
              <button
                onClick={() => {
                  if (!viewAllMode) {
                    // Entering view all mode - select all categories and hide categories section
                    const allCategories = Array.from(new Set(normalizedFunctions.map((f) => f.category)));
                    setSelectedCategories(allCategories);
                    setViewAllMode(true);
                  } else {
                    // Leaving view all mode - deselect all and show categories again
                    setSelectedCategories([]);
                    setViewAllMode(false);
                  }
                }}
                className="text-ric-red text-sm font-semibold hover:text-ric-navy flex items-center gap-1 bg-none border-none cursor-pointer">
                {viewAllMode ? 'Ver todas las categorías' : 'Ver todas las funciones'}
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>

            {/* Categories Grid - 5 columns full width */}
            <div className="grid grid-cols-5 gap-3 px-6">
              {mainCategories.map((category) => {
                const categoryCount = normalizedFunctions.filter((f) => f.category === category).length;
                const info = categoryInfo[category as string] || { description: '' };
                const icon = getCategoryIcon(category as string);

                const bgColors: Record<string, string> = {
                  'Acciones': 'bg-red-50',
                  'Derivados & Valoración': 'bg-purple-50',
                  'Economía & Macro': 'bg-blue-50',
                  'Noticias': 'bg-orange-50',
                  'Renta Fija & Crédito': 'bg-indigo-50'
                };

                return (
                  <button
                    key={category}
                    onClick={() => toggleCategory(category)}
                    className={`${bgColors[category as string] || 'bg-slate-50'} rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer group border-2 ${
                      selectedCategories.includes(category)
                        ? 'border-ric-red bg-red-100'
                        : 'border-transparent'
                    }`}
                  >
                    <div className="mb-3">{icon}</div>
                    <h3 className="text-base font-bold text-ric-navy mb-2 group-hover:text-ric-red transition-colors text-left">
                      {category}
                    </h3>
                    <p className="text-xs text-slate-600 mb-4 leading-tight h-8 overflow-hidden text-left">
                      {info.description}
                    </p>
                    <div className="flex items-center justify-between pt-3 border-t border-slate-300">
                      <span className="text-xs font-bold text-ric-red">{categoryCount} funciones</span>
                      <svg className="w-4 h-4 text-ric-red group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Filtered Functions Display - Show when searching OR categories selected */}
        {(searchTerm.trim() || selectedCategories.length > 0) && (
          <div className="">
            <div className="mb-6">
              <h2 className="text-xl font-bold text-ric-navy mb-3">Resultados de la Búsqueda</h2>
              <p className="text-sm text-slate-600">
                Mostrando <span className="font-bold text-ric-red">{filteredFunctions.length}</span> de{' '}
                <span className="font-bold">{normalizedFunctions.length}</span> funciones
              </p>
            </div>

            {filteredFunctions.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredFunctions.map((func) => (
                  <Link key={func.id} href={`/functions/${func.id}`}>
                    <div className="group h-full bg-white rounded-xl shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border-2 border-slate-200 hover:border-ric-red cursor-pointer">
                      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ric-red via-ric-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                      <div className="p-5">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <span className="inline-block px-3 py-1 bg-ric-navy text-white text-xs font-bold rounded-full">
                              {func.ticker}
                            </span>
                            <span className="inline-block px-3 py-1 bg-slate-100 text-ric-navy text-xs font-medium rounded-full">
                              {func.category}
                            </span>
                          </div>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              toggleFavorite(func.id);
                            }}
                            className="transition-all hover:scale-110"
                            title={isFavorite(func.id) ? 'Remover de favoritos' : 'Agregar a favoritos'}
                          >
                            <span className={`text-xl ${isFavorite(func.id) ? 'text-ric-red' : 'text-slate-400'}`}>
                              ♥
                            </span>
                          </button>
                        </div>

                        <h3 className="text-lg font-bold text-ric-navy mb-2 group-hover:text-ric-red transition-colors line-clamp-2">
                          {func.name}
                        </h3>

                        <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                          {func.description}
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-slate-600 font-medium">No se encontraron funciones</p>
                <p className="text-sm text-slate-500">Intenta con otros términos de búsqueda o filtros</p>
              </div>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="mt-8 pt-8 border-t border-slate-300 text-center">
          <div className="text-center">
            <h3 className="text-lg font-bold text-ric-navy mb-2">
              RIC - Lab de Finanzas - Functions Explorer
            </h3>
            <p className="text-sm text-slate-600 mb-1">Powered by Bloomberg</p>
            <p className="text-xs text-slate-500">
              Desarrollado por el equipo del Laboratorio de Finanzas
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
