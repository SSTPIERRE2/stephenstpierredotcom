import { GitHub, Icon, Layers, Linkedin, Mail, Twitter } from 'react-feather';

export type THEME = 'light' | 'dark';

export const LIGHT_COLORS = {
  '--color-text': '#030712',
  '--color-text-supporting': 'var(--color-gray-600)',
  '--color-text-on-primary': 'var(--color-gray-100)',
  '--color-background': '#FFFFFF',
  '--color-background-accent': 'var(--color-gray-200)',
  '--color-backdrop': 'hsla(0deg, 0%, 100%, 0.75)',
  '--color-border': 'var(--color-gray-400)',
  '--color-underline': 'var(--color-primary-100)',
  '--color-skeleton': 'var(--color-gray-300)',
  '--color-skeleton-highlight': 'var(--color-gray-200)',

  '--color-primary-50': '#e9eafd',
  '--color-primary-100': '#c7caf8',
  '--color-primary-200': '#a1a7f4',
  '--color-primary-300': '#7884f0',
  '--color-primary-400': '#5867ec',
  '--color-primary': '#354ae6',
  '--color-primary-600': '#3041db',
  '--color-primary-700': '#2535ce',
  '--color-primary-800': '#1929c3',
  '--color-primary-900': '#000bb1',
  '--color-primary-accent': 'var(--color-primary-200)',

  '--color-secondary': '#E3008A',
  '--color-accent': '#7935e6',

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

  '--scrollbar-color': 'var(--color-gray-400)',
  '--scrollbar-background-color': 'var(--color-gray-200)',

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
  '--color-text-supporting': 'var(--color-gray-400)',
  '--color-text-on-primary': 'var(--color-gray-1000)',
  '--color-background': '#0f172a',
  '--color-background-accent': '#1e293b',
  '--color-backdrop': 'hsla(222, 47%, 11%, 0.85)',
  '--color-border': 'var(--color-gray-600)',
  '--color-underline': 'var(--color-primary-900)',
  '--color-skeleton': 'var(--color-gray-700)',
  '--color-skeleton-highlight': 'var(--color-gray-600)',

  '--color-primary-200': '#cff49e',
  '--color-primary-300': '#bdef76',
  '--color-primary-400': '#afea56',
  '--color-primary': '#a3e635',
  '--color-primary-600': '#99d32c',
  '--color-primary-700': '#8cbd1f',
  '--color-primary-800': '#7fa510',
  '--color-primary-900': '#6b7e00',
  '--color-primary-accent': 'var(--color-primary-900)',

  '--color-secondary': '#a855f7',
  '--color-accent': '#ea0081',

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

  '--scrollbar-color': 'var(--color-gray-500)',
  '--scrollbar-background-color': 'var(--color-gray-800)',

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

export const AVATAR_HEIGHT_WIDTH_RATIO = 0.354;

export type slug = 'about' | 'blog';
export type label = 'About' | 'Blog';
export type href = '/about' | '/blog';
export type navLink = { slug: slug; label: label; href: href };
export type link = { slug: string; label: string; href: string; icon: Icon };
export type headingLink = { text: string; id: string };

export const LINKS: navLink[] = [
  {
    slug: 'blog',
    label: 'Blog',
    href: '/blog',
  },
  {
    slug: 'about',
    label: 'About',
    href: '/about',
  },
];

export const SOCIAL_LINKS: link[] = [
  {
    slug: 'github',
    label: 'Github',
    href: 'https://github.com/SSTPIERRE2',
    icon: GitHub,
  },
  {
    slug: 'linkedIn',
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/stephencstpierre/',
    icon: Linkedin,
  },
  {
    slug: 'stackOverflow',
    label: 'Stack Overflow',
    href: 'https://stackoverflow.com/users/8183576/stephen',
    icon: Layers,
  },
  {
    slug: 'twitter',
    label: 'Twitter',
    href: 'https://twitter.com/nothisisSteve',
    icon: Twitter,
  },
  {
    slug: 'email',
    label: 'Email',
    href: 'mailto:stephencstpierre@gmail.com',
    icon: Mail,
  },
];

export enum PostType {
  Post = 1,
  Tip,
}
