export type THEME = 'light' | 'dark';

export const LIGHT_COLORS = {
  '--color-text': '#030712',
  '--color-background': '#FFFFFF',
  '--color-background-accent': '#cbd5e1',
  '--color-backdrop': 'hsla(222, 47%, 11%, 0.85)',

  '--color-primary': '#7935e6',
  '--color-primary-accent': '#bfa0f3',
  '--color-secondary': '#354ae6',
  '--color-accent': '#E3008A',

  '--color-info': '#3041db',
  '--color-success': '#4d7c0f',
  '--color-warning': '#CD4600',
  '--color-error': '#dc2626',

  '--color-gray-0': '#f8fafc',
  '--color-gray-100': '#f1f5f9',
  '--color-gray-200': '#e2e8f0',
  '--color-gray-300': '#cbd5e1',
  '--color-gray-400': '#94a3b8',
  '--color-gray-500': '#64748b',
  '--color-gray-600': '#475569',
  '--color-gray-700': '#334155',
  '--color-gray-800': '#1e293b',
  '--color-gray-900': '#0f172a',
  '--color-gray-1000': '#020617',
};

export const DARK_COLORS = {
  '--color-text': '#f8fafc',
  '--color-background': '#0f172a',
  '--color-background-accent': '#1e293b',
  '--color-backdrop': 'hsla(222, 47%, 11%, 0.85)',

  '--color-primary': '#a3e635',
  '--color-primary-accent': '#4d7c0f',
  '--color-secondary': '#a855f7',
  '--color-accent': '#ec4899',

  '--color-info': '#3b82f6',
  '--color-success': '#84cc16',
  '--color-warning': '#facc15',
  '--color-error': '#f43f5e',

  '--color-gray-0': '#f9fafb',
  '--color-gray-100': '#f3f4f6',
  '--color-gray-200': '#e5e7eb',
  '--color-gray-300': '#d1d5db',
  '--color-gray-400': '#9ca3af',
  '--color-gray-500': '#6b7280',
  '--color-gray-600': '#4b5563',
  '--color-gray-700': '#374151',
  '--color-gray-800': '#1f2937',
  '--color-gray-900': '#111827',
  '--color-gray-1000': '#030712',
};

export const COLORS = {
  white: 'hsl(0, 0%, 100%)',
  gray: {
    50: 'hsl(60, 9.1%, 97.8%)',
    100: 'hsl(60, 4.8%, 95.9%)',
    200: 'hsl(20, 5.9%, 90%)',
    300: 'hsl(24, 5.7%, 82.9%)',
    400: 'hsl(24, 5.4%, 63.9%)',
    500: 'hsl(25, 5.3%, 44.7%)',
    600: 'hsl(33.3, 5.5%, 32.4%)',
    700: '30deg 6.3% 25.1%)',
    800: 'hsl(12, 6.5%, 15.1%)',
    900: 'hsl(24, 9.8%, 10%)',
    950: 'hsl(20, 14.3%, 4.1%)',
  },
  primary: {
    light: '#93c5fd',
    normal: 'hsl(213.1, 93.9%, 67.8%)',
    dark: '#2563eb',
    darker: 'hsl(224.3, 76.3%, 48%)',
    darkest: 'hsl(225.9, 70.7%, 40.2%)',
    spectrumGradient: `linear-gradient(
        125deg,
        hsl(212deg 96% 78%) 0%,
        hsl(213deg 96% 72%) 8%,
        hsl(215deg 95% 66%) 17%,
        hsl(217deg 91% 60%) 25%,
        hsl(218deg 89% 57%) 33%,
        hsl(219deg 86% 55%) 42%,
        hsl(221deg 83% 53%) 50%,
        hsl(222deg 79% 52%) 58%,
        hsl(223deg 75% 50%) 67%,
        hsl(224deg 76% 48%) 75%,
        hsl(225deg 74% 45%) 83%,
        hsl(225deg 73% 43%) 92%,
        hsl(226deg 71% 40%) 100%
    );`,
  },
  secondary: {
    light: 'hsl(52.8, 98.3%, 76.9%)',
    normal: 'hsl(45, 93%, 47%)',
    dark: 'hsl(40.6, 96.1%, 40.4%)',
  },
  indigo: {
    normal: 'hsl(238.7, 83.5%, 66.7%)',
    dark: 'hsl(243.4, 75.4%, 58.6%)',
    darker: 'hsl(244.5, 57.9%, 50.6%)',
    bluePurpleGradient: `linear-gradient(
        125deg,
        hsl(212deg 96% 78%) 0%,
        hsl(213deg 96% 72%) 8%,
        hsl(215deg 95% 66%) 17%,
        hsl(217deg 91% 60%) 25%,
        hsl(218deg 89% 57%) 33%,
        hsl(219deg 86% 55%) 42%,
        hsl(221deg 83% 53%) 50%,
        hsl(228deg 74% 54%) 58%,
        hsl(235deg 65% 53%) 67%,
        hsl(245deg 58% 51%) 75%,
        hsl(244deg 56% 48%) 83%,
        hsl(244deg 55% 44%) 92%,
        hsl(244deg 55% 41%) 100%
    );`,
  },
};

export const WEIGHTS = {
  normal: 500,
  medium: 600,
  bold: 800,
};

const BREAKPOINTS = {
  phoneMax: 600,
  tabletMax: 950,
  laptopMax: 1300,
};

export const QUERIES = {
  phoneAndBelow: `(max-width: ${BREAKPOINTS.phoneMax / 16}rem)`,
  tabletAndBelow: `(max-width: ${BREAKPOINTS.tabletMax / 16}rem)`,
  laptopAndBelow: `(max-width: ${BREAKPOINTS.laptopMax / 16}rem)`,
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export const API_ENDPOINTS = {
  graphql: `${API_URL}/graphql`,
  magicLink: `${API_URL}/auth/link/authorize`,
};

export const AVATAR_HEIGHT_WIDTH_RATIO = 0.354;
