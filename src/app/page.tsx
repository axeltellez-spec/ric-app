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
      <div className="flex-1 flex items-center justify-center px-4 py-4">
        <div className="max-w-4xl mx-auto w-full">
          {/* Header Image - Rosario Investment Club */}
          <div className="flex justify-center mb-3">
            <div className="w-32 h-32 bg-white rounded-2xl flex items-center justify-center shadow-2xl overflow-hidden">
              <img
                src="/images/decoration.png"
                alt="Rosario Investment Club"
                className="w-full h-full object-contain p-3"
              />
            </div>
          </div>

          {/* Main Title */}
          <div className="text-center mb-3">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ric-navy mb-2 leading-tight">
              Explorador de Funciones<br />Bloomberg
            </h1>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Descubre, busca y guarda tus funciones financieras favoritas de la plataforma Bloomberg en un solo lugar.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
            <Link
              href="/functions"
              className="px-7 py-3 bg-ric-navy text-white rounded-lg font-bold text-base shadow-lg hover:shadow-xl hover:bg-slate-900 transition-all hover:-translate-y-1 transform active:scale-95 flex items-center justify-center"
            >
              Explorar Funciones →
            </Link>
            <Link
              href="/favorites"
              className="px-8 py-4 bg-ric-red text-white border-2 border-ric-red rounded-lg font-bold text-lg shadow-lg hover:shadow-xl hover:bg-red-700 transition-all hover:-translate-y-1 transform active:scale-95 flex items-center justify-center"
            >
              Mis Favoritos ♥
            </Link>
          </div>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {/* Feature 1 */}
            <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200 hover:border-ric-red transition-colors hover:shadow-lg">
              <div className="w-10 h-10 bg-ric-navy rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-ric-navy mb-2">Buscar & Filtrar</h3>
              <p className="text-slate-600 text-sm">
                Encuentra funciones por nombre, código ticker o descripción. Filtra por categoría para resultados precisos.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200 hover:border-ric-red transition-colors hover:shadow-lg">
              <div className="w-10 h-10 bg-ric-red rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-ric-navy mb-2">Guardar Favoritos</h3>
              <p className="text-slate-600 text-sm">
                Marca tus funciones preferidas y accede a ellas fácilmente desde tu panel de favoritos personalizado.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 bg-white rounded-xl shadow-md border border-slate-200 hover:border-ric-red transition-colors hover:shadow-lg">
              <div className="w-10 h-10 bg-ric-navy rounded-lg flex items-center justify-center mb-3">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-base font-bold text-ric-navy mb-2">Información Detallada</h3>
              <p className="text-slate-600 text-sm">
                Accede a descripciones completas, categorías y detalles de cada función Bloomberg terminal.
              </p>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-3 gap-2 mb-2 p-3 bg-white rounded-xl shadow-md border border-slate-200">
            <div className="text-center">
              <p className="text-xl font-bold text-ric-navy">{functions.length}+</p>
              <p className="text-xs text-slate-600 mt-0.5">Funciones</p>
            </div>
            <div className="text-center border-l border-r border-slate-200">
              <p className="text-xl font-bold text-ric-red">{functions.length > 0 ? Array.from(new Set(functions.map((f: any) => f.categoria || f.category))).length : 0}</p>
              <p className="text-xs text-slate-600 mt-0.5">Categorías</p>
            </div>
            <div className="text-center">
              <p className="text-xl font-bold text-ric-navy">∞</p>
              <p className="text-xs text-slate-600 mt-0.5">Búsqueda</p>
            </div>
          </div>
        </div>
      </div>


      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-600 text-sm mb-1">
            RIC - Lab de Finanzas - Functions Explorer - Powered by Bloomberg
          </p>
          <p className="text-slate-600 text-sm">
            Desarrollado por el equipo del Laboratorio de Finanzas
          </p>
        </div>
      </footer>
    </div>
  );
}