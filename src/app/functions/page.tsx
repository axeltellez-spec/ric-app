import SearchSection from '@/components/SearchSection';
import CategoriesGrid from '@/components/CategoriesGrid';
import path from 'path';
import fs from 'fs';

export const dynamic = 'force-dynamic';

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

export default async function FunctionsPage() {
  const functions = await getFunctions();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="container mx-auto px-4 py-12">
        {/* Header Section with Red Accent */}
        <div className="mb-16 relative">
          <div className="absolute -left-4 top-0 w-1 h-16 bg-gradient-to-b from-ric-red to-transparent rounded-full"></div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-ric-navy mb-4">
            Funciones Bloomberg
          </h1>
          <p className="text-lg text-slate-600 max-w-3xl leading-relaxed">
            Accede a las herramientas más poderosas de Bloomberg Terminal. Explora por categoría y descubre funciones avanzadas para análisis financiero profesional.
          </p>

          {/* Red Divider */}
          <div className="mt-6 h-1 w-20 bg-gradient-to-r from-ric-red to-transparent rounded-full"></div>
        </div>

        {/* Search Section Component with all functionality */}
        <SearchSection functions={functions} />

        {/* Categories Grid Component */}
        <CategoriesGrid functions={functions} />
      </div>
    </div>
  );
}
