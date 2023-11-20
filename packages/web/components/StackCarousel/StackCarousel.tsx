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
import GraphqlLogo from '../GraphqlLogo';

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
        containerMessage: 'Tech Stack',
      }}
      modules={[Autoplay]}
      grabCursor
      loop
    >
      <SwiperSlide className={styles.slide}>
        <HtmlLogo />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <CssLogo />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <JavaScriptLogo />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <ReactLogo className={styles.reactLogo} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <NextJsLogo theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <TypeScriptLogo />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <NodeJsLogo theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <PostgresLogo />
        <span className={styles.wordMark} aria-hidden>
          PostgreSQL
        </span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <AwsLogo theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <ServerlessLogo />
        <span className={styles.wordMark} aria-hidden>
          Serverless
        </span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <RtlLogo />
        <span className={styles.wordMark} aria-hidden>
          React Testing Library
        </span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <VitestLogo />
        <span className={styles.wordMark} aria-hidden>
          Vitest
        </span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <EslintLogo theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <FigmaLogo />
        <span className={styles.wordMark} aria-hidden>
          Figma
        </span>
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <StyledComponentsLogo theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <DockerLogo theme={theme} />
      </SwiperSlide>
      <SwiperSlide className={styles.slide}>
        <GraphqlLogo />
      </SwiperSlide>
    </Swiper>
  );
};

export default StackCarousel;
