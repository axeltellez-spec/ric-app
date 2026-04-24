import Link from 'next/link';
import SearchSection from '@/components/SearchSection';
import path from 'path';
import fs from 'fs';

async function getFunctions() {
  try {
    const filePath = path.join(process.cwd(), 'public/data/functions.json');
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(fileContent);
    // Return the functions array from the new structure
    return Array.isArray(data) ? data : (data.functions || []);
  } catch (error) {
    console.error('Error loading functions:', error);
    return [];
  }
}

export default async function HomePage() {
  const functions = await getFunctions();

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50 flex flex-col">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-4xl mx-auto w-full">
          {/* Animated Eagle Logo */}
          <div className="flex justify-center mb-12">
            <div className="w-24 h-24 bg-gradient-to-br from-ric-navy to-ric-red rounded-2xl flex items-center justify-center animate-pulse shadow-2xl">
              <svg className="w-16 h-16 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
              </svg>
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-8">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-ric-navy mb-4 leading-tight">
              Explorador de Funciones<br />Bloomberg
            </h1>
            <p className="text-xl md:text-2xl text-slate-600 max-w-2xl mx-auto">
              Descubre, busca y guarda tus funciones financieras favoritas de la plataforma Bloomberg en un solo lugar.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Link
              href="/functions"
              className="px-8 py-4 bg-ric-navy text-white rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:bg-slate-900 transition-all hover:-translate-y-1 transform active:scale-95"
            >
              Explorar Funciones →
            </Link>
            <Link
              href="/favorites"
              className="px-8 py-4 bg-ric-red text-white border-2 border-ric-red rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:bg-red-700 transition-all hover:-translate-y-1 transform active:scale-95"
            >
              Mis Favoritos ♥
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-16">
            {/* Feature 1 */}
            <div className="p-8 bg-white rounded-xl shadow-md border border-slate-200 hover:border-ric-red transition-colors hover:shadow-lg">
              <div className="w-12 h-12 bg-ric-navy rounded-lg flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-ric-navy mb-3">Buscar & Filtrar</h3>
              <p className="text-slate-600 text-sm">
                Encuentra funciones por nombre, código ticker o descripción. Filtra por categoría para resultados precisos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 bg-white rounded-xl shadow-md border border-slate-200 hover:border-ric-red transition-colors hover:shadow-lg">
              <div className="w-12 h-12 bg-ric-red rounded-lg flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-ric-navy mb-3">Guardar Favoritos</h3>
              <p className="text-slate-600 text-sm">
                Marca tus funciones preferidas y accede a ellas fácilmente desde tu panel de favoritos personalizado.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 bg-white rounded-xl shadow-md border border-slate-200 hover:border-ric-red transition-colors hover:shadow-lg">
              <div className="w-12 h-12 bg-ric-navy rounded-lg flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-ric-navy mb-3">Información Detallada</h3>
              <p className="text-slate-600 text-sm">
                Accede a descripciones completas, categorías y detalles de cada función Bloomberg terminal.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-4 mb-16 p-8 bg-white rounded-xl shadow-md border border-slate-200">
            <div className="text-center">
              <p className="text-3xl font-bold text-ric-navy">{functions.length}+</p>
              <p className="text-sm text-slate-600 mt-1">Funciones Disponibles</p>
            </div>
            <div className="text-center border-l border-r border-slate-200">
              <p className="text-3xl font-bold text-ric-red">{functions.length > 0 ? Array.from(new Set(functions.map((f: any) => f.categoria || f.category))).length : 0}</p>
              <p className="text-sm text-slate-600 mt-1">Categorías</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-ric-navy">∞</p>
              <p className="text-sm text-slate-600 mt-1">Opciones de Búsqueda</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search Section */}
      {functions.length > 0 && (
        <div className="bg-white py-16 border-t border-slate-200">
          <div className="container mx-auto px-4">
            <SearchSection functions={functions} />
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600 text-sm mb-2">
            RIC - Lab de Finanzas - Functions Explorer - Powered by Bloomberg • Desarrollado por el equipo del Laboratorio de Finanzas
          </p>
        </div>
      </footer>
    </div>
  );
}