module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(240 80% 50%)',
        accent: 'hsl(170 80% 45%)',
        bg: 'hsl(220 15% 98%)',
        surface: 'hsl(220 15% 100%)',
        'text-primary': 'hsl(220 15% 15%)',
        'text-secondary': 'hsl(220 15% 45%)',
        rekt: 'hsl(0 70% 55%)',
        rich: 'hsl(120 60% 45%)',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 15%, 5%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
      },
      fontFamily: {
        'body': ['system-ui', 'sans-serif'],
      },
      fontSize: {
        'display': ['3rem', { lineHeight: '1.2', fontWeight: '700' }],
        'heading': ['1.875rem', { lineHeight: '1.3', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.75', fontWeight: '400' }],
      },
    },
  },
  plugins: [],
}
