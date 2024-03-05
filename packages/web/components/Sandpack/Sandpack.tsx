'use client';

import { useTheme } from '@/app/context/ThemeContext';
import {
  SandpackProvider,
  SandpackProviderProps,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackLayout,
} from '@codesandbox/sandpack-react';
import { cyberpunk, cobalt2 } from '@codesandbox/sandpack-themes';
import styles from './Sandpack.module.css';

interface Props extends SandpackProviderProps {}

const Sandpack = ({ template = 'react', files, ...rest }: Props) => {
  const { theme } = useTheme();

  return (
    <SandpackProvider
      template={template}
      files={files}
      theme={theme === 'dark' ? cyberpunk : cobalt2}
      {...rest}
    >
      <SandpackLayout className={styles.sandpack}>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default Sandpack;
