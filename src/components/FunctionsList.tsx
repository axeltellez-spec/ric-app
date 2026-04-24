'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';

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

export default function FunctionsList({ functions }: { functions: Function[] }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

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

  // Get unique categories from data
  const CATEGORIES = useMemo(() => {
    return Array.from(
      new Set(
        normalizedFunctions
          .map((f) => f.category)
          .filter(Boolean)
      )
    ).sort();
  }, [normalizedFunctions]);

  const filteredFunctions = useMemo(() => {
    return normalizedFunctions.filter((func) => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        func.name.toLowerCase().includes(searchLower) ||
        func.ticker.toLowerCase().includes(searchLower) ||
        func.description.toLowerCase().includes(searchLower);

      const matchesCategory =
        selectedCategories.length === 0 ||
        selectedCategories.includes(func.category);

      return matchesSearch && matchesCategory;
    });
  }, [normalizedFunctions, searchTerm, selectedCategories]);

  const toggleCategory = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-8">
        <input
          type="text"
          placeholder="Buscar por nombre, ticker o descripción..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 border-2 border-ric-navy rounded-lg focus:outline-none focus:border-ric-red transition-colors bg-white text-ric-navy placeholder-slate-400"
        />
      </div>

      {/* Category Filters */}
      {CATEGORIES.length > 0 && (
        <div className="mb-8 p-6 bg-white rounded-xl border-2 border-slate-200 shadow-sm">
          <h3 className="text-sm font-bold text-ric-navy mb-4 uppercase tracking-wide flex items-center gap-2">
            <svg className="w-5 h-5 text-ric-red" fill="currentColor" viewBox="0 0 20 20">
              <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM15 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2h-2zM5 13a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5z" />
            </svg>
            Filtrar por Categoría
          </h3>
          <div className="flex flex-wrap gap-3">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => toggleCategory(category)}
                className={`px-5 py-2.5 rounded-lg text-sm font-bold transition-all duration-300 transform hover:scale-105 border-2 ${
                  selectedCategories.includes(category)
                    ? 'bg-ric-red text-white shadow-lg border-ric-red scale-105'
                    : 'bg-slate-50 text-ric-navy border-slate-300 hover:border-ric-red hover:bg-red-50'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results info */}
      <div className="mb-6">
        <p className="text-sm text-slate-600">
          Mostrando <span className="font-bold text-ric-red">{filteredFunctions.length}</span> de{' '}
          <span className="font-bold">{normalizedFunctions.length}</span> funciones
        </p>
      </div>

      {/* Functions Grid */}
      {filteredFunctions.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFunctions.map((func) => (
            <Link key={func.id} href={`/functions/${func.id}`}>
              <div className="group h-full bg-white rounded-xl shadow-md hover:shadow-2xl transition-all hover:-translate-y-2 overflow-hidden border-2 border-slate-200 hover:border-ric-red cursor-pointer relative">
                {/* Top red accent line */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-ric-red via-ric-red to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                {/* Image */}
                <div className="relative h-40 bg-gradient-to-br from-ric-navy to-ric-red overflow-hidden">
                  {func.imageUrl ? (
                    <img
                      src={func.imageUrl}
                      alt={func.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-white/50">
                      <svg className="w-16 h-16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Content */}
                <div className="p-5">
                  {/* Ticker Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-3 py-1 bg-ric-navy text-white text-xs font-bold rounded-full">
                      {func.ticker}
                    </span>
                    <span className="inline-block px-3 py-1 bg-slate-100 text-ric-navy text-xs font-medium rounded-full">
                      {func.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-ric-navy mb-2 group-hover:text-ric-red transition-colors line-clamp-2">
                    {func.name}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 line-clamp-3 mb-4">
                    {func.description}
                  </p>

                  {/* CTA */}
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
          <p className="text-sm text-slate-500">Intenta con otros términos de búsqueda</p>
        </div>
      )}
    </div>
  );
}