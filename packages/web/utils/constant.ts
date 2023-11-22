export type THEME = 'light' | 'dark';

export const LIGHT_COLORS = {
  '--color-text': '#030712',
  '--color-background': '#FFFFFF',
  '--color-background-accent': '#cbd5e1',
  '--color-backdrop': 'hsla(0deg, 0%, 100%, 0.75)',

  '--color-primary-300': '#a577ef',
  '--color-primary-400': '#8f57eb',
  '--color-primary': '#7935e6',
  '--color-primary-600': '#6e30df',
  '--color-primary-700': '#5e27d6',
  '--color-primary-accent': '#bfa0f3',
  '--color-secondary': '#E3008A',
  '--color-accent': '#354ae6',

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

  '--retro-sun-gradient': `linear-gradient(
    to bottom,
    #ef17fe,
    #c540ff 30%,
    #9e6cfe 45%,
    #9e6cfe 54.9%,
    var(--color-background) 55%,
    var(--color-background) 57%,
    #8d75ff 57.1%,
    #8d75ff 62.1%,
    var(--color-background) 62.2%,
    var(--color-background) 64.2%,
    #55a9ff 64.3%,
    #55a9ff 70.3%,
    var(--color-background) 70.4%,
    var(--color-background) 72.4%,
    #40c4ff 72.5%,
    #40c4ff 78.5%,
    var(--color-background) 78.6%,
    var(--color-background) 80.6%,
    #4cdeff 80.7%,
    #4cdeff 86.7%,
    var(--color-background) 86.8%,
    var(--color-background) 88.8%,
    #57f9fe 88.9%
  )`,
  '--retro-sun-shadow': 'drop-shadow(0px -5px 24px #c540ff)',
  '--retro-horizontal-gradient': `linear-gradient(
    90deg,
    hsl(296deg 99% 54%) 0%,
    hsl(286deg 100% 64%) 23%,
    hsl(273deg 100% 68%) 33%,
    hsl(261deg 99% 71%) 41%,
    hsl(235deg 100% 74%) 49%,
    hsl(218deg 100% 69%) 55%,
    hsl(210deg 100% 67%) 62%,
    hsl(200deg 100% 61%) 68%,
    hsl(194deg 100% 60%) 74%,
    hsl(191deg 100% 65%) 80%,
    hsl(197deg 100% 50%) 86%,
    hsl(208deg 100% 50%) 93%,
    hsl(233deg 78% 55%) 100%
  )`,
  '--retro-vertical-gradient': ``,
  '--retro-oasis-glow': 'drop-shadow(-3px -1px 3px #c540ff)',
};

export const DARK_COLORS = {
  '--color-text': '#f8fafc',
  '--color-background': '#0f172a',
  '--color-background-accent': '#1e293b',
  '--color-backdrop': 'hsla(222, 47%, 11%, 0.85)',

  '--color-primary-300': '#bdef76',
  '--color-primary-400': '#afea56',
  '--color-primary': '#a3e635',
  '--color-primary-600': '#99d32c',
  '--color-primary-700': '#8cbd1f',
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

  '--retro-sun-gradient': `linear-gradient(
    to bottom,
    #f9b214,
    #f67e5a 30%,
    #f4598b 45%,
    #f4598b 54.9%,
    var(--color-background) 55%,
    var(--color-background) 57%,
    #f44d93 57.1%,
    #f44d93 62.1%,
    var(--color-background) 62.2%,
    var(--color-background) 64.2%,
    #f441a9 64.3%,
    #f441a9 70.3%,
    var(--color-background) 70.4%,
    var(--color-background) 72.4%,
    #f234bb 72.5%,
    #f234bb 78.5%,
    var(--color-background) 78.6%,
    var(--color-background) 80.6%,
    #ef27cc 80.7%,
    #ef27cc 86.7%,
    var(--color-background) 86.8%,
    var(--color-background) 88.8%,
    #f20aff 88.9%
  )`,
  '--retro-sun-shadow': 'drop-shadow(0px -5px 24px #f67e5a)',
  '--retro-horizontal-gradient': `linear-gradient(
    90deg,
    hsl(41deg 95% 53%) 0%,
    hsl(33deg 99% 59%) 19%,
    hsl(26deg 99% 63%) 32%,
    hsl(19deg 95% 65%) 42%,
    hsl(10deg 91% 67%) 51%,
    hsl(358deg 94% 69%) 58%,
    hsl(346deg 93% 66%) 65%,
    hsl(334deg 85% 62%) 72%,
    hsl(325deg 88% 59%) 78%,
    hsl(316deg 95% 57%) 85%,
    hsl(307deg 96% 52%) 92%,
    hsl(297deg 100% 52%) 100%
  )`,
  '--retro-vertical-gradient': ``,
  '--retro-oasis-glow': 'drop-shadow(-3px -1px 3px #f67e5a)',
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

export type slug = 'about' | 'tips' | 'posts';
export type label = 'About' | 'Tips' | 'Posts';
export type href = '/about' | '/tips' | '/posts';

export const LINKS: { slug: slug; label: label; href: href }[] = [
  {
    slug: 'about',
    label: 'About',
    href: '/about',
  },
  {
    slug: 'tips',
    label: 'Tips',
    href: '/tips',
  },
  {
    slug: 'posts',
    label: 'Posts',
    href: '/posts',
  },
];
