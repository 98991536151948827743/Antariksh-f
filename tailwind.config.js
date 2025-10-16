/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        space: {
          dark: '#0a0e27',
          navy: '#1e3a8a',
          blue: '#3b82f6',
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
        
        cosmic: {
          purple: '#8b5cf6',
          glow: '#60a5fa' ,  
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui'],
        'display': ['Space Grotesk', 'Inter', 'ui-sans-serif'],
      },
      fontSize: {
        'hero': ['clamp(4rem, 15vw, 12rem)', { lineHeight: '1', fontWeight: '800' }],
        'subtitle': ['1.125rem', { lineHeight: '1.75', fontWeight: '300' }],
      },
      backgroundImage: {
        'space-gradient': 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      }
    },
    
  },
  plugins: [],
}