import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // RIC & Bloomberg branding colors
        ric: {
          navy: '#2d5a79',        // Primary navy blue (Bloomberg)
          navyLight: '#3d7a99',   // Lighter navy
          navyDark: '#1d3a59',    // Darker navy
          red: '#c8102e',         // Brand red accent (Bloomberg)
          redLight: '#e63946',    // Lighter red for hover
          redDark: '#9a0a24',     // Darker red for pressed
        },
        // Neutral grays for financial design
        neutral: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          900: '#111827',
        },
        // Supporting colors
        slate: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      backgroundColor: {
        'ric-navy': '#2d5a79',
        'ric-red': '#c8102e',
      },
      textColor: {
        'ric-navy': '#2d5a79',
        'ric-red': '#c8102e',
      },
      borderColor: {
        'ric-navy': '#2d5a79',
        'ric-red': '#c8102e',
      },
    },
  },
  plugins: [],
};

export default config;
