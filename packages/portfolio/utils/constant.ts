export const LIGHT_COLORS = {
  '--color-text': 'hsl(0deg 0% 5%)',
  '--color-primary-100': 'hsl(240deg 100% 90%)',
  '--color-primary-300': 'hsl(242deg 100% 70%)',
  '--color-primary-500': 'hsl(245deg 100% 60%)',
  '--color-primary-700': 'hsl(250deg 100% 33%)',
  '--color-primary-900': 'hsl(256deg 100% 20%)',
  '--color-primary-contrast': 'white',
  '--color-secondary-500': 'hsl(328deg 100% 50%)',
  '--color-decorative-100': 'hsl(50deg 100% 94%)',
  '--color-decorative-200': 'hsl(50deg 100% 90%)',
  '--color-decorative-300': 'hsl(50deg 100% 85%)',
  '--color-decorative-500': 'hsl(50deg 100% 70%)',
  '--color-decorative-600': 'hsl(50deg 100% 60%)',
  '--color-decorative-700': 'hsl(50deg 100% 50%)',
  '--color-decorative-800': 'hsl(50deg 100% 33%)',
  '--color-decorative-900': 'hsl(50deg 100% 25%)',
  '--color-gray-0': 'white',
  '--color-gray-100': 'hsl(50deg 20% 90%)',
  '--color-gray-200': 'hsl(50deg 15% 85%)',
  '--color-gray-300': 'hsl(50deg 10% 70%)',
  '--color-gray-500': 'hsl(50deg 4% 50%)',
  '--color-gray-700': 'hsl(50deg 10% 25%)',
  '--color-gray-900': 'hsl(50deg 20% 10%)',
  '--color-gray-1000': 'black',
};

export const DARK_COLORS = {
  '--color-text': 'hsl(0deg 0% 100%)',
  '--color-primary-100': 'hsl(50deg 100% 90%)',
  '--color-primary-300': 'hsl(50deg 100% 70%)',
  '--color-primary-500': 'hsl(50deg 100% 50%)',
  '--color-primary-700': 'hsl(50deg 100% 35%)',
  '--color-primary-900': 'hsl(50deg 100% 25%)',
  '--color-primary-contrast': 'black',
  '--color-secondary-500': 'hsl(328deg 100% 50%)',
  '--color-decorative-100': 'hsl(256deg 20% 4%)',
  '--color-decorative-200': 'hsl(256deg 30% 10%)',
  '--color-decorative-300': 'hsl(256deg 30% 15%)',
  '--color-decorative-500': 'hsl(256deg 40% 30%)',
  '--color-decorative-600': 'hsl(256deg 40% 40%)',
  '--color-decorative-700': 'hsl(256deg 40% 50%)',
  '--color-decorative-800': 'hsl(256deg 45% 65%)',
  '--color-decorative-900': 'hsl(256deg 55% 80%)',
  '--color-gray-0': 'black',
  '--color-gray-100': 'hsl(256deg 20% 10%)',
  '--color-gray-200': 'hsl(256deg 15% 15%)',
  '--color-gray-300': 'hsl(256deg 10% 30%)',
  '--color-gray-500': 'hsl(256deg 4% 50%)',
  '--color-gray-700': 'hsl(256deg 10% 75%)',
  '--color-gray-900': 'hsl(256deg 20% 90%)',
  '--color-gray-1000': 'white',
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
