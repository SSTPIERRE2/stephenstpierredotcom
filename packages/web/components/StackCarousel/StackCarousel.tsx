'use client';

// Swiper-related imports
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Autoplay } from 'swiper/modules';
import './SwiperOverrides.css';

// Logos and other imports
import AwsLogo from '../AwsLogo';
import CssLogo from '../CssLogo';
import EslintLogo from '../EslintLogo';
import HtmlLogo from '../HtmlLogo';
import JavaScriptLogo from '../JavaScriptLogo';
import NextJsLogo from '../NextJsLogo';
import NodeJsLogo from '../NodeJsLogo';
import PostgresLogo from '../PostgresLogo';
import ReactLogo from '../ReactLogo';
import RtlLogo from '../RtlLogo';
import ServerlessLogo from '../ServerlessLogo';
import TypeScriptLogo from '../TypeScriptLogo';
import VitestLogo from '../VitestLogo';
import styles from './StackCarousel.module.css';
import { useTheme } from '@/app/context/ThemeContext';
import FigmaLogo from '../FigmaLogo';
import StyledComponentsLogo from '../StyledComponentsLogo';
import DockerLogo from '../DockerLogo';
import VisuallyHidden from '../VisuallyHidden';

interface Props {}

const StackCarousel = ({}: Props) => {
  const { theme } = useTheme();

  return (
    <Swiper
      className={styles.swiper}
      breakpoints={{
        320: {
          slidesPerView: 2,
        },
        480: {
          slidesPerView: 3,
        },
        640: {
          slidesPerView: 4,
        },
        1080: {
          slidesPerView: 6,
        },
      }}
      speed={4000}
      autoplay={{
        delay: 0,
        pauseOnMouseEnter: true,
        disableOnInteraction: true,
      }}
      a11y={{
        enabled: true,
      }}
      modules={[Autoplay]}
      grabCursor
      loop
    >
      <SwiperSlide className={styles.slide}>
        <HtmlLogo />
        <VisuallyHidden>HTML</VisuallyHidden>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <CssLogo />
        <VisuallyHidden>CSS</VisuallyHidden>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <JavaScriptLogo />
        <VisuallyHidden>JavaScript</VisuallyHidden>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <ReactLogo className={styles.reactLogo} />
        <VisuallyHidden>React.js</VisuallyHidden>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <NextJsLogo theme={theme} />
        <VisuallyHidden>Next.js</VisuallyHidden>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <TypeScriptLogo />
        <VisuallyHidden>TypeScript</VisuallyHidden>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <NodeJsLogo theme={theme} />
        <VisuallyHidden>Node.js</VisuallyHidden>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <PostgresLogo />
        <span className={styles.wordMark}>PostgreSQL</span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <AwsLogo theme={theme} />
        <VisuallyHidden>Amazon Web Services</VisuallyHidden>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <ServerlessLogo />
        <span className={styles.wordMark}>Serverless</span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <RtlLogo />
        <span className={styles.wordMark}>React Testing Library</span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <VitestLogo />
        <span className={styles.wordMark}>Vitest</span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <EslintLogo theme={theme} />
        <VisuallyHidden>ESLint</VisuallyHidden>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <FigmaLogo />
        <span className={styles.wordMark}>Figma</span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <StyledComponentsLogo theme={theme} />
        <VisuallyHidden>Styled Components</VisuallyHidden>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <DockerLogo theme={theme} />
        <VisuallyHidden>Docker</VisuallyHidden>
      </SwiperSlide>
    </Swiper>
  );
};

export default StackCarousel;
