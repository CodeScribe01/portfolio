/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    extend: {
      colors: {
        // solid grounds — no translucency, no gradients
        bg: {
          DEFAULT: '#FFFFFF',
          alt: '#F2F5FA',
        },
        surface: '#FFFFFF',
        ink: {
          DEFAULT: '#12141A',
          2: '#454B58',
          3: '#6A7180',
        },
        line: {
          DEFAULT: '#DFE2EA',
          soft: '#ECEEF3',
          strong: '#C4CAD8',
        },
        // institutional blue, used as a solid fill
        navy: {
          DEFAULT: '#172E6E',
          deep: '#0F1F4D',
          soft: '#E8ECFB',
        },
        acc: {
          DEFAULT: '#2B4BD8',
          deep: '#1E38AE',
          soft: '#E8ECFB',
        },
        ok: '#0E7C5A',
        warn: '#B45309',
      },
      fontFamily: {
        serif: ['"Source Serif 4"', 'Georgia', 'Cambria', '"Times New Roman"', 'serif'],
        sans: ['"Source Sans 3"', 'ui-sans-serif', 'system-ui', '-apple-system', '"Segoe UI"', 'sans-serif'],
        mono: ['"Source Code Pro"', 'ui-monospace', '"Cascadia Mono"', 'monospace'],
      },
      maxWidth: {
        shell: '1180px',
        prose: '65ch',
      },
      transitionTimingFunction: {
        smooth: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
      fontSize: {
        'd-1': ['clamp(2.6rem, 6.6vw, 4.9rem)', { lineHeight: '1.02', letterSpacing: '-0.028em' }],
        'd-2': ['clamp(1.85rem, 3.8vw, 2.7rem)', { lineHeight: '1.12', letterSpacing: '-0.022em' }],
        'd-3': ['clamp(1.3rem, 2.5vw, 1.65rem)', { lineHeight: '1.18', letterSpacing: '-0.016em' }],
      },
      keyframes: {
        ring: {
          '0%': { transform: 'scale(1)', opacity: '0.5' },
          '70%, 100%': { transform: 'scale(2.8)', opacity: '0' },
        },
        blip: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.35' },
        },
      },
      animation: {
        ring: 'ring 2.6s ease-out infinite',
        blip: 'blip 2.2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
