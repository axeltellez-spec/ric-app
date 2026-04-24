'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Header() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-ric-red via-red-700 to-purple-900 text-white sticky top-0 z-50 shadow-xl border-b-4 border-purple-900">
      <div className="container mx-auto px-4 py-0">
        <div className="flex items-center justify-between">
          {/* Left Logo - RIC */}
          <Link href="/" className="flex items-center gap-2 hover:opacity-95 transition-opacity group">
            <div className="flex items-center justify-center bg-white rounded-xl shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all overflow-hidden" style={{ width: '90px', height: '90px' }}>
              <img
                src="/images/hero-center.png"
                alt="Rosario Investment Club"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>

            {/* Text Branding */}
            <div className="flex flex-col justify-center">
              <h1 className="text-lg font-black tracking-tight text-white">FACULTAD</h1>
              <p className="text-xs text-purple-100 -mt-1 font-semibold">de Economía</p>
            </div>
          </Link>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              href="/functions" 
              className="relative group font-semibold hover:text-purple-200 transition-colors"
            >
              Funciones
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-200 group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              href="/dashboard" 
              className="relative group font-semibold hover:text-purple-200 transition-colors"
            >
              Dashboard
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-200 group-hover:w-full transition-all"></span>
            </Link>
            <Link 
              href="/favorites" 
              className="relative group font-semibold hover:text-purple-200 transition-colors"
            >
              Favoritos ♥
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-200 group-hover:w-full transition-all"></span>
            </Link>

            {/* Divider */}
            <div className="w-px h-6 bg-purple-400"></div>

            {/* Right Logo - Laboratorio de Finanzas */}
            <div className="flex items-center justify-center bg-white rounded-lg shadow-lg group-hover:shadow-xl group-hover:scale-110 transition-all overflow-hidden" style={{ width: '90px', height: '90px' }}>
              <img
                src="/images/logo-laboratorio-de-finanzas.jpg"
                alt="Laboratorio de Finanzas"
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </div>
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 hover:bg-purple-700 rounded-lg transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <nav className="md:hidden mt-4 space-y-3 pb-4 border-t border-purple-700 pt-4">
            <Link 
              href="/functions" 
              className="block font-semibold hover:text-purple-200 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Funciones
            </Link>
            <Link 
              href="/dashboard" 
              className="block font-semibold hover:text-purple-200 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            <Link 
              href="/favorites" 
              className="block font-semibold hover:text-purple-200 transition-colors py-2"
              onClick={() => setIsOpen(false)}
            >
              Favoritos ♥
            </Link>
          </nav>
        )}
      </div>
    </header>
  );
}