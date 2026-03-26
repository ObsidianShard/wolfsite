export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Deep space colors
        'wolfspace': {
          dark: '#0a0a0f',
          midnight: '#0d0d1a',
          navy: '#121224',
          light: '#1a1a3a'
        },
        // Neon accents (90s anime/cyberpunk)
        'neon': {
          cyan: '#00ffff',
          magenta: '#ff00ff',
          yellow: '#ffff00',
          red: '#ff0055',
          blue: '#0088ff'
        },
        // Premium branding
        'wolfskind': {
          gold: '#ffd700',
          bronze: '#cd7f32'
        },
        // Text
        'text': {
          primary: '#ffffff',
          secondary: '#a0a0b0',
          muted: '#606070'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      }
    },
  },
  plugins: [],
}
