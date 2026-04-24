'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import FunctionsList from './FunctionsList';

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

// Icons removed - using images only instead

const CATEGORY_IMAGES: Record<string, string> = {
  'Noticias': 'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop',
  'Acciones': 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=400&h=300&fit=crop',
  'Renta Fija & Crédito': 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop',
  'Derivados & Valoración': 'https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=400&h=300&fit=crop',
  'Economía & Macro': 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400&h=300&fit=crop',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  'Noticias': 'Últimas noticias del mercado y alertas importantes',
  'Acciones': 'Análisis de equities y datos del mercado de acciones',
  'Renta Fija & Crédito': 'Análisis de bonos y mercados de renta fija',
  'Derivados & Valoración': 'Herramientas de valoración y análisis de derivados',
  'Economía & Macro': 'Indicadores económicos globales y análisis macro',
};

export default function CategoriesGrid({ functions }: { functions: Function[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // Normalize function fields
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

  // Get unique categories
  const categories = useMemo(() => {
    const cats = Array.from(
      new Set(normalizedFunctions.map((f) => f.category).filter(Boolean))
    );
    return cats.sort();
  }, [normalizedFunctions]);

  if (selectedCategory) {
    const filteredFunctions = normalizedFunctions.filter(
      (f) => f.category === selectedCategory
    );
    return (
      <div className="w-full">
        {/* Back Button */}
        <button
          onClick={() => setSelectedCategory(null)}
          className="mb-8 inline-flex items-center gap-2 text-ric-navy hover:text-ric-red font-semibold transition-colors group"
        >
          <svg
            className="w-5 h-5 group-hover:-translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Volver a Categorías
        </button>

        {/* Category Header */}
        <div className="mb-12 p-6 bg-gradient-to-r from-ric-navy to-slate-800 rounded-xl text-white">
          <h2 className="text-4xl font-bold mb-2">
            {selectedCategory}
          </h2>
          <p className="text-slate-200">
            {CATEGORY_DESCRIPTIONS[selectedCategory] ||
              `Funciones relacionadas con ${selectedCategory}`}
          </p>
          <div className="mt-4 inline-block px-4 py-2 bg-ric-red rounded-full text-sm font-semibold">
            {filteredFunctions.length} funciones
          </div>
        </div>

        {/* Functions List */}
        <FunctionsList functions={filteredFunctions} />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="mb-12">
        <h2 className="text-3xl font-bold text-ric-navy mb-3">
          Selecciona una Categoría
        </h2>
        <p className="text-slate-600">
          Explora nuestras funciones Bloomberg organizadas por categoría
        </p>
      </div>

      {/* Categories Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.map((categoryName) => {
          const categoryFunctions = normalizedFunctions.filter(
            (f) => f.category === categoryName
          );
          return (
            <button
              key={categoryName}
              onClick={() => setSelectedCategory(categoryName)}
              className="group text-left h-full bg-white rounded-xl shadow-md hover:shadow-xl transition-all hover:-translate-y-1 overflow-hidden border-2 border-slate-200 hover:border-ric-red"
            >
              {/* Category Header with Image */}
              <div className="relative h-48 bg-slate-300 overflow-hidden">
                {/* Background Image */}
                <img
                  src={
                    CATEGORY_IMAGES[categoryName] ||
                    'https://images.unsplash.com/photo-1633356122544-f134324ef6db?w=400&h=300&fit=crop'
                  }
                  alt={categoryName}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-70 transition-opacity"></div>

                {/* Red accent bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-ric-red opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>

              {/* Content */}
              <div className="p-6">
                {/* Title */}
                <h3 className="text-2xl font-bold text-ric-navy mb-2 group-hover:text-ric-red transition-colors">
                  {categoryName}
                </h3>

                {/* Description */}
                <p className="text-slate-600 text-sm mb-4 line-clamp-2">
                  {CATEGORY_DESCRIPTIONS[categoryName] ||
                    `Funciones relacionadas con ${categoryName}`}
                </p>

                {/* Count */}
                <div className="flex items-center justify-between">
                  <span className="inline-block px-3 py-1 bg-slate-100 text-ric-navy text-xs font-bold rounded-full">
                    {categoryFunctions.length} funciones
                  </span>
                  <span className="text-ric-red font-bold group-hover:gap-2 transition-all flex items-center gap-1">
                    Ver
                    <svg
                      className="w-4 h-4 group-hover:translate-x-1 transition-transform"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Red Accent Line */}
              <div className="h-1 bg-gradient-to-r from-ric-red to-transparent group-hover:from-ric-red to-ric-red transition-all"></div>
            </button>
          );
        })}
      </div>
    </div>
  );
}