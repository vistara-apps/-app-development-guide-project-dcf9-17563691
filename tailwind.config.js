module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        // Enhanced color palette with better contrast and accessibility
        primary: 'hsl(240 80% 50%)', // Kept the same for brand consistency
        'primary-hover': 'hsl(240 80% 45%)',
        'primary-light': 'hsl(240 80% 95%)',
        accent: 'hsl(170 80% 45%)',
        'accent-hover': 'hsl(170 80% 40%)',
        'accent-light': 'hsl(170 80% 95%)',
        bg: 'hsl(220 15% 98%)',
        surface: 'hsl(220 15% 100%)',
        'surface-hover': 'hsl(220 15% 97%)',
        'text-primary': 'hsl(220 15% 15%)',
        'text-secondary': 'hsl(220 15% 40%)', // Slightly darker for better contrast
        'text-tertiary': 'hsl(220 15% 60%)',
        'success': 'hsl(145 70% 40%)',
        'success-light': 'hsl(145 70% 95%)',
        'error': 'hsl(0 70% 50%)',
        'error-light': 'hsl(0 70% 95%)',
        'warning': 'hsl(40 100% 50%)',
        'warning-light': 'hsl(40 100% 95%)',
        'rekt': 'hsl(0 70% 50%)',
        'rekt-light': 'hsl(0 70% 95%)',
        'rich': 'hsl(145 70% 40%)',
        'rich-light': 'hsl(145 70% 95%)',
      },
      spacing: {
        xs: '4px',
        sm: '8px',
        md: '16px', // Increased for better spacing
        lg: '24px', // Increased for better spacing
        xl: '32px',
        '2xl': '48px',
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 4px 12px hsla(220, 15%, 5%, 0.08)',
        'card-hover': '0 8px 16px hsla(220, 15%, 5%, 0.12)',
        modal: '0 10px 25px hsla(220, 15%, 5%, 0.15)',
        button: '0 2px 4px hsla(220, 15%, 5%, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 200ms ease-out',
        'slide-up': 'slideUp 200ms ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'base': ['1rem', { lineHeight: '1.75', letterSpacing: '0.01em' }],
        'lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0' }],
        'xl': ['1.25rem', { lineHeight: '1.5', letterSpacing: '-0.01em', fontWeight: '500' }],
        '2xl': ['1.5rem', { lineHeight: '1.4', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display': ['2.5rem', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'heading': ['1.875rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body': ['1rem', { lineHeight: '1.75', letterSpacing: '0.01em', fontWeight: '400' }],
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      transitionProperty: {
        'height': 'height',
        'spacing': 'margin, padding',
      },
      transitionDuration: {
        '250': '250ms',
      },
      transitionTimingFunction: {
        'bounce': 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
      },
    },
  },
  plugins: [],
}
