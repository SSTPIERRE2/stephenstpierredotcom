'use client';

import AwsLogo from '../logos/AwsLogo';
import CssLogo from '../logos/CssLogo';
import EslintLogo from '../logos/EslintLogo';
import HtmlLogo from '../logos/HtmlLogo';
import JavaScriptLogo from '../logos/JavaScriptLogo';
import NextJsLogo from '../logos/NextJsLogo';
import NodeJsLogo from '../logos/NodeJsLogo';
import PostgresLogo from '../logos/PostgresLogo';
import ReactLogo from '../logos/ReactLogo';
import RtlLogo from '../logos/RtlLogo';
import ServerlessLogo from '../logos/ServerlessLogo';
import TypeScriptLogo from '../logos/TypeScriptLogo';
import VitestLogo from '../logos/VitestLogo';
import styles from './StackCarousel.module.css';
import { useTheme } from '@/app/context/ThemeContext';
import FigmaLogo from '../logos/FigmaLogo';
import StyledComponentsLogo from '../logos/StyledComponentsLogo';
import DockerLogo from '../logos/DockerLogo';
import GraphqlLogo from '../logos/GraphqlLogo';
import PrettierLogo from '../logos/PrettierLogo';

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
