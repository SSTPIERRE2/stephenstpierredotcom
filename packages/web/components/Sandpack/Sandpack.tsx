'use client';

import {
  SandpackProvider,
  SandpackProviderProps,
  SandpackCodeEditor,
  SandpackPreview,
  SandpackLayout,
} from '@codesandbox/sandpack-react';

interface Props extends SandpackProviderProps {}

const Sandpack = ({ template = 'react', files, ...rest }: Props) => {
  return (
    <SandpackProvider template={template} files={files} {...rest}>
      <SandpackLayout>
        <SandpackCodeEditor />
        <SandpackPreview />
      </SandpackLayout>
    </SandpackProvider>
  );
};

export default Sandpack;
