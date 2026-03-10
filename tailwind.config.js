/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // VitePress light mode
        vp: {
          bg:        '#ffffff',
          'bg-soft': '#f6f6f7',
          'bg-mute': '#eeeeee',
          border:    '#e2e2e3',
          divider:   '#e2e2e3',
          text:      '#213547',
          'text-2':  '#476582',
          'text-3':  '#90a4b7',
          // dark
          'dark-bg':        '#1b1b1f',
          'dark-bg-soft':   '#161618',
          'dark-bg-mute':   '#202127',
          'dark-border':    '#2e2e32',
          'dark-text':      'rgba(255,255,255,0.87)',
          'dark-text-2':    'rgba(235,235,245,0.6)',
          'dark-text-3':    'rgba(235,235,245,0.38)',
        },
        accent: {
          DEFAULT: '#7c3aed',
          light:   '#8b5cf6',
          soft:    'rgba(124,58,237,0.14)',
          dark:    '#6d28d9',
        },
      },
    },
  },
  plugins: [],
}
