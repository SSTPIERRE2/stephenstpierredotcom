'use client';

import { COLORS } from '../../utils/constant';
import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
/*
  1. Use a more-intuitive box-sizing model.
*/
*, *::before, *::after {
  box-sizing: border-box;
}
/*
  2. Remove default margin
*/
* {
  margin: 0;
}
/*
  3. Allow percentage-based heights in the application
*/
html, body {
  height: 100%;
}
/*
  Typographic tweaks!
  4. Add accessible line-height
  5. Improve text rendering
*/
body {
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  /* Darkest blues, but still not dark enough for page background */
  /* background: linear-gradient(
    180deg,
    hsl(226deg 57% 21%) 0%,
    hsl(226deg 58% 22%) 11%,
    hsl(226deg 59% 24%) 22%,
    hsl(225deg 60% 25%) 33%,
    hsl(225deg 61% 26%) 44%,
    hsl(225deg 62% 28%) 56%,
    hsl(225deg 62% 29%) 67%,
    hsl(225deg 63% 30%) 78%,
    hsl(225deg 64% 32%) 89%,
    hsl(224deg 64% 33%) 100%
  ); */
  /* Slate 900 GOOD this might be the one */
  background: #0f172a;
  /* Gray 900 nearly identical to slate 900 but slightly less blue */
  /* background: #111827; */
  /* 
  stripe gradient with darkest blues
  background: linear-gradient(
    180deg,
    hsl(226deg 57% 21%) 0%,
    hsl(225deg 60% 25%) 8%,
    hsl(225deg 62% 29%) 17%,
    hsl(224deg 64% 33%) 25%,
    hsl(225deg 68% 35%) 33%,
    hsl(225deg 70% 38%) 42%,
    hsl(226deg 71% 40%) 50%,
    hsl(225deg 70% 38%) 58%,
    hsl(225deg 68% 35%) 67%,
    hsl(224deg 64% 33%) 75%,
    hsl(225deg 62% 29%) 83%,
    hsl(225deg 60% 25%) 92%,
    hsl(226deg 57% 21%) 100%
  ); */
    /* 
    mid-darker blues
    background: linear-gradient(
    180deg,
    hsl(226deg 71% 40%) 0%,
    hsl(225deg 73% 43%) 8%,
    hsl(225deg 74% 45%) 17%,
    hsl(224deg 76% 48%) 25%,
    hsl(223deg 75% 50%) 33%,
    hsl(222deg 79% 52%) 42%,
    hsl(221deg 83% 53%) 50%,
    hsl(222deg 79% 52%) 58%,
    hsl(223deg 75% 50%) 67%,
    hsl(224deg 76% 48%) 75%,
    hsl(225deg 74% 45%) 83%,
    hsl(225deg 73% 43%) 92%,
    hsl(226deg 71% 40%) 100%
  ); */
  /*
  same as above but with purpleish stripes instead of blue
  background: linear-gradient(
    180deg,
    hsl(226deg 71% 40%) 0%,
    hsl(231deg 64% 44%) 8%,
    hsl(237deg 57% 48%) 17%,
    hsl(245deg 58% 51%) 25%,
    hsl(235deg 65% 53%) 33%,
    hsl(228deg 74% 54%) 42%,
    hsl(221deg 83% 53%) 50%,
    hsl(228deg 74% 54%) 58%,
    hsl(235deg 65% 53%) 67%,
    hsl(245deg 58% 51%) 75%,
    hsl(237deg 57% 48%) 83%,
    hsl(231deg 64% 44%) 92%,
    hsl(226deg 71% 40%) 100%
  ); */
  /* 
  blue diagonal to dark blue/purple
  background: linear-gradient(
    180deg,
    hsl(221deg 83% 53%) 0%,
    hsl(225deg 78% 54%) 10%,
    hsl(229deg 73% 54%) 20%,
    hsl(233deg 67% 54%) 30%,
    hsl(239deg 62% 53%) 40%,
    hsl(245deg 58% 51%) 50%,
    hsl(244deg 56% 49%) 60%,
    hsl(244deg 56% 47%) 70%,
    hsl(244deg 55% 45%) 80%,
    hsl(244deg 55% 43%) 90%,
    hsl(244deg 55% 41%) 100%
  ); */
  /* background: var(--gradient-blue-purple) */
  /* background: linear-gradient(
      to bottom,
      var(--color-primary-darkest),
      var(--color-gray-800)
    ); */
}
/*
  6. Improve media defaults
*/
img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}
/*
  7. Remove built-in form typography styles
*/
input, button, textarea, select {
  font: inherit;
}
/*
  8. Avoid text overflows
*/
p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}
/*
  9. Create a root stacking context
*/
#root, #__next {
  isolation: isolate;
}

/*
  10. Set CSS variables
*/
html {
  --color-white: ${COLORS.white};
  --color-primary-light: ${COLORS.primary.light};
  --color-primary: ${COLORS.primary.normal};
  --color-primary-dark: ${COLORS.primary.dark};
  --color-primary-darker: ${COLORS.primary.darker};
  --color-primary-darkest: ${COLORS.primary.darkest};
  --color-secondary-light: ${COLORS.secondary.light};
  --color-secondary: ${COLORS.secondary.normal};
  --color-secondary-dark: ${COLORS.secondary.dark};
  --color-gray-50: ${COLORS.gray[50]};
  --color-gray-100: ${COLORS.gray[100]};
  --color-gray-200: ${COLORS.gray[200]};
  --color-gray-300: ${COLORS.gray[300]};
  --color-gray-400: ${COLORS.gray[400]};
  --color-gray-500: ${COLORS.gray[500]};
  --color-gray-600: ${COLORS.gray[600]};
  --color-gray-700: hsl(${COLORS.gray[700]});
  --color-gray-800: ${COLORS.gray[800]};
  --color-gray-900: ${COLORS.gray[900]};
  --color-gray-950: ${COLORS.gray[950]};
  --color-backdrop: hsl(${COLORS.gray[700]} / 0.8);
  --gradient-blue-spectrum: ${COLORS.primary.spectrumGradient};
  --gradient-blue-purple: ${COLORS.indigo.bluePurpleGradient};

  /*
    Font weights
  */
  --font-weight-normal: 500;
  --font-weight-medium: 600;
  --font-weight-bold: 800;
  
  /*
    Silence the warning about missing Reach Dialog styles
  */
  --reach-dialog: 1;
}
`;

export default GlobalStyles;
