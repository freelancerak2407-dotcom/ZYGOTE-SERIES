// Copy this into your tailwind.config.js 'extend' object

const { colors } = require('./colors');
const { typography } = require('./typography');

module.exports = {
  colors: colors,
  fontFamily: typography.fontFamily,
  fontSize: typography.fontSize,
  boxShadow: {
    'soft': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
    'glow': '0 0 15px rgba(39, 230, 212, 0.3)', // Aqua glow
    'card': '0 1px 3px rgba(0,0,0,0.12), 0 1px 2px rgba(0,0,0,0.24)',
  },
  borderRadius: {
    'xl': '1rem',
    '2xl': '1.5rem',
  },
  animation: {
    'fade-in': 'fadeIn 0.5s ease-out',
    'slide-up': 'slideUp 0.5s ease-out',
    'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  },
  keyframes: {
    fadeIn: {
      '0%': { opacity: '0' },
      '100%': { opacity: '1' },
    },
    slideUp: {
      '0%': { transform: 'translateY(20px)', opacity: '0' },
      '100%': { transform: 'translateY(0)', opacity: '1' },
    },
  },
};
