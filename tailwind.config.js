/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        'galaxy-fold': '321px', // @media (min-width: 321px)
        mobile: '768px', // @media (min-width: 768px)
        tablet: '1024px' // @media (min-width: 1024px)
      }
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        'pr-900': 'var(--pr-900)',
        'pr-800': 'var(--pr-800)',
        'pr-700': 'var(--pr-700)',
        'pr-600': 'var(--pr-600)',
        'pr-500': 'var(--pr-500)',
        'pr-400': 'var(--pr-400)',
        'pr-300': 'var(--pr-300)',
        'pr-200': 'var(--pr-200)',
        'pr-100': 'var(--pr-100)',
        'pr-50': 'var(--pr-50)',
        'sm-info-700': 'var(--sm-info-700)',
        'sm-info-500': 'var(--sm-info-500)',
        'sm-info-50': 'var(--sm-info-50)',
        'sm-error-700': 'var(--sm-error-700)',
        'sm-error-500': 'var(--sm-error-500)',
        'sm-error-50': 'var(--sm-error-50)',
        'sm-warining-700': 'var(--sm-warining-700)',
        'sm-warining-500': 'var(--sm-warining-500)',
        'sm-warining-50': 'var(--sm-warining-50)',
        'gr-black': 'var(--gr-black)',
        'gr-900': 'var(--gr-900)',
        'gr-800': 'var(--gr-800)',
        'gr-700': 'var(--gr-700)',
        'gr-600': 'var(--gr-600)',
        'gr-500': 'var(--gr-500)',
        'gr-400': 'var(--gr-400)',
        'gr-300': 'var(--gr-300)',
        'gr-200': 'var(--gr-200)',
        'gr-100': 'var(--gr-100)',
        'gr-50': 'var(--gr-50)',
        'gr-10': 'var(--gr-10)',
        'gr-white': 'var(--gr-white)'
      },
      fontSize: {
        'heading-1': ['24px', { lineHeight: '140%', fontWeight: 'bold' }],
        'heading-2': ['20px', { lineHeight: '140%', fontWeight: 'bold' }],
        'heading-3': ['18px', { lineHeight: '120%', fontWeight: 'bold' }],
        'heading-4': ['16px', { lineHeight: '120%', fontWeight: 'bold' }],
        'heading-5': ['14px', { lineHeight: '120%', fontWeight: 'bold' }],
        'heading-6': ['12px', { lineHeight: '120%', fontWeight: 'bold' }],
        'sub-heading-1': ['14px', { lineHeight: '120%', fontWeight: 'medium' }],
        'sub-heading-2': ['12px', { lineHeight: '120%', fontWeight: 'medium' }],
        'body-1': ['18px', { lineHeight: '130%', fontWeight: 'regular' }],
        'body-2': ['16px', { lineHeight: '130%', fontWeight: 'regular' }],
        'body-3': ['14px', { lineHeight: '130%', fontWeight: 'regular' }],
        'body-4': ['12px', { lineHeight: '130%', fontWeight: 'regular' }],
        'label-1': ['16px', { lineHeight: '150%', fontWeight: 'regular' }],
        'label-2': ['14px', { lineHeight: '150%', fontWeight: 'regular' }],
        'btn-1': ['16px', { lineHeight: '200%', fontWeight: 'semi-bold' }],
        'btn-2': ['14px', { lineHeight: '200%', fontWeight: 'semi-bold' }],
        'btn-3': ['12px', { lineHeight: '100%', fontWeight: 'medium' }]
      },
      fontWeight: {
        bold: '700',
        'semi-bold': '600',
        medium: '500',
        regular: '400'
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: { height: 0 },
          to: { height: 'var(--radix-accordion-content-height)' }
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: 0 }
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out'
      }
    }
  },
  plugins: [require('tailwindcss-animate')]
};
