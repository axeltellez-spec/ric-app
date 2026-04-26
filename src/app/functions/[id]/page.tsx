'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useParams } from 'next/navigation';
import { useFavorites } from '@/hooks/useFavorites';

interface Function {
  id: string | number;
  codigo?: string;
  nombre?: string;
  descripcion?: string;
  categoria?: string;
  imagen?: string | null;
  ticker: string;
  name: string;
  description: string;
  category: string;
  imageUrl?: string | undefined;
}

// Category images mapping (no emojis, just category colors)
const CATEGORY_IMAGES: Record<string, string> = {
  'Noticias': '/images/noticias.svg',
  'Acciones': '/images/acciones.svg',
  'Renta Fija & Crédito': '/images/renta-fija.svg',
  'Valoración': '/images/derivados.svg',
  'Economía & Macro': '/images/economia.svg',
};

export default function FunctionDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [func, setFunc] = useState<Function | null>(null);
  const [loading, setLoading] = useState(true);
  const { isFavorite, toggleFavorite } = useFavorites();

  useEffect(() => {
    const loadFunction = async () => {
      try {
        const response = await fetch('/data/functions.json');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        // Handle both old array format and new object format
        let functions: any[] = [];
        if (Array.isArray(data)) {
          functions = data;
        } else if (data && typeof data === 'object' && Array.isArray(data.functions)) {
          functions = data.functions;
        }

        if (!Array.isArray(functions)) {
          throw new Error('Functions data is not an array');
        }

        // Normalize the function data
        const found = functions.find((f: any) => {
          const functionId = (f.id || f.codigo || '').toString().toLowerCase();
          return functionId === id.toLowerCase();
        });

        if (found) {
          const normalized: Function = {
            id: found.id || found.codigo || '',
            ticker: found.ticker || found.codigo || '',
            name: found.name || found.nombre || '',
            description: found.description || found.descripcion || '',
            category: found.category || found.categoria || '',
            imageUrl: found.imageUrl || found.imagen || undefined,
          };
          setFunc(normalized);
        }
      } catch (error) {
        console.error('Error loading function:', error);
      } finally {
        setLoading(false);
      }
    };

    loadFunction();
  }, [id]);


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

  if (!func) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="container mx-auto px-4 py-12 text-center">
          <p className="text-slate-600 text-lg mb-6">Función no encontrada</p>
          <Link href="/functions" className="text-ric-red font-semibold hover:text-ric-navy">
            ← Volver a funciones
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Link href="/functions" className="inline-flex items-center text-ric-navy hover:text-ric-red font-semibold mb-8 transition-colors">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Volver a funciones
        </Link>

        {/* Detail Container */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-0">
            {/* Image Section */}
            <div className={`relative h-96 md:h-full overflow-hidden md:order-2 ${func.imageUrl ? 'bg-black' : 'bg-gradient-to-br from-ric-navy to-ric-red'}`}>
              {func.imageUrl ? (
                <Image
                  src={func.imageUrl}
                  alt={func.name}
                  fill
                  className="object-contain"
                />
              ) : (
                <Image
                  src={CATEGORY_IMAGES[func.category as string] || CATEGORY_IMAGES['Acciones']}
                  alt={func.category || 'Category Image'}
                  fill
                  className="object-cover"
                />
              )}
            </div>

            {/* Content Section */}
            <div className="p-8 md:p-12 flex flex-col justify-between md:order-1">
              {/* Header */}
              <div>
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="px-4 py-2 bg-ric-navy text-white text-sm font-bold rounded-full">
                        {func.ticker}
                      </span>
                      <span className="px-4 py-2 bg-slate-100 text-ric-navy text-sm font-medium rounded-full">
                        {func.category}
                      </span>
                    </div>
                    <h1 className="text-4xl font-bold text-ric-navy">{func.name}</h1>
                  </div>
                  <button
                    onClick={() => toggleFavorite(func.id)}
                    className="p-3 rounded-full transition-all hover:bg-slate-100"
                    title={isFavorite(func.id) ? 'Remover de favoritos' : 'Agregar a favoritos'}
                  >
                    {isFavorite(func.id) ? (
                      <svg className="w-8 h-8 text-ric-red fill-current" viewBox="0 0 24 24">
                        <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                      </svg>
                    ) : (
                      <svg className="w-8 h-8 text-slate-400 hover:text-ric-red transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    )}
                  </button>
                </div>

                {/* Description */}
                <div className="mb-8">
                  <h2 className="text-sm font-bold text-ric-navy uppercase tracking-wide mb-3">
                    Descripción
                  </h2>
                  <p className="text-lg text-slate-700 leading-relaxed">
                    {func.description}
                  </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-2 gap-4 py-6 border-t border-b border-slate-200">
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Ticker</p>
                    <p className="text-2xl font-bold text-ric-red mt-1">{func.ticker}</p>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wide">Categoría</p>
                    <p className="text-lg font-bold text-ric-navy mt-1">{func.category}</p>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="mt-8 pt-4">
                <button
                  onClick={() => toggleFavorite(func.id)}
                  className={`w-full py-3 rounded-lg font-bold text-lg transition-all ${
                    isFavorite(func.id)
                      ? 'bg-ric-red text-white hover:bg-red-700'
                      : 'bg-ric-navy text-white hover:bg-slate-900'
                  }`}
                >
                  {isFavorite(func.id) ? '♥ Guardado en favoritos' : '+ Agregar a favoritos'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-8 bg-white rounded-xl shadow-md border border-slate-200">
          <h3 className="text-lg font-bold text-ric-navy mb-4">Información de Bloomberg</h3>
          <p className="text-slate-600 text-sm leading-relaxed">
            Esta función es parte de la plataforma Bloomberg Terminal. Para más información detallada, 
            integración con tu sistema - Excel, o acceso a la TerminaI de Bloomberg, por favor contacta al equipo de monitores del Laboratorio de Finanzas.
          </p>
        </div>
      </div>
    </div>
  );
}
