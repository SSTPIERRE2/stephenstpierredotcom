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
      speed={3000}
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
        <HtmlLogo className={styles.logo} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <CssLogo className={styles.logo} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <JavaScriptLogo className={styles.logo} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <ReactLogo className={`${styles.logo} ${styles.reactLogo}`} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <NextJsLogo className={styles.logo} theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <TypeScriptLogo className={styles.logo} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <NodeJsLogo className={styles.logo} theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <PostgresLogo className={styles.logo} />
        <span className={styles.wordMark}>PostgreSQL</span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <AwsLogo className={styles.logo} theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <ServerlessLogo className={styles.logo} />
        <span className={styles.wordMark}>Serverless</span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <RtlLogo className={styles.logo} />
        <span className={styles.wordMark}>React Testing Library</span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <VitestLogo className={styles.logo} />
        <span className={styles.wordMark}>Vitest</span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <EslintLogo className={styles.logo} theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <FigmaLogo className={styles.logo} />
        <span className={styles.wordMark}>Figma</span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <StyledComponentsLogo className={styles.logo} theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <DockerLogo className={styles.logo} theme={theme} />
      </SwiperSlide>
    </Swiper>
  );
};

export default StackCarousel;
