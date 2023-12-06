'use client';

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
import PrettierLogo from '../PrettierLogo';

interface Props {}

const StackCarousel = ({}: Props) => {
  const { theme } = useTheme();

  return (
    <ul className={styles.swiper}>
      <li className={styles.slide}>
        <HtmlLogo />
      </li>
      <li className={styles.slide}>
        <CssLogo />
      </li>
      <li className={styles.slide}>
        <JavaScriptLogo />
      </li>
      <li className={styles.slide}>
        <ReactLogo className={styles.reactLogo} />
      </li>
      <li className={styles.slide}>
        <NextJsLogo theme={theme} />
      </li>
      <li className={styles.slide}>
        <TypeScriptLogo />
      </li>
      <li className={styles.slide}>
        <NodeJsLogo theme={theme} />
      </li>
      <li className={styles.slide}>
        <PostgresLogo />
        <span className={styles.wordMark} aria-hidden>
          PostgreSQL
        </span>
      </li>
      <li className={styles.slide}>
        <AwsLogo theme={theme} />
      </li>
      <li className={styles.slide}>
        <ServerlessLogo />
        <span className={styles.wordMark} aria-hidden>
          Serverless
        </span>
      </li>
      <li className={styles.slide}>
        <RtlLogo />
        <span className={styles.wordMark} aria-hidden>
          React Testing Library
        </span>
      </li>
      <li className={styles.slide}>
        <VitestLogo />
        <span className={styles.wordMark} aria-hidden>
          Vitest
        </span>
      </li>
      <li className={styles.slide}>
        <EslintLogo theme={theme} />
      </li>
      <li className={styles.slide}>
        <PrettierLogo />
        <span className={styles.wordMark} aria-hidden>
          Prettier
        </span>
      </li>
      <li className={styles.slide}>
        <FigmaLogo />
        <span className={styles.wordMark} aria-hidden>
          Figma
        </span>
      </li>
      <li className={styles.slide}>
        <StyledComponentsLogo />
      </li>
      <li className={styles.slide}>
        <DockerLogo theme={theme} />
      </li>
      <li className={styles.slide}>
        <GraphqlLogo />
      </li>
    </ul>
  );
};

export default StackCarousel;
