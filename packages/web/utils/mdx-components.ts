import CodeSnippet from '@/components/CodeSnippet';
import { PrimaryNewTabLink } from '@/components/PrimaryLink';
import Sandpack from '@/components/Sandpack';

const COMPONENT_MAP = {
  Sandpack,
  pre: CodeSnippet,
  a: PrimaryNewTabLink,
};

export default COMPONENT_MAP;
