import CodeSnippet from '@/components/CodeSnippet';
import SectionHeading from '@/components/SectionHeading';
import { PrimaryNewTabLink } from '@/components/PrimaryLink';
import Sandpack from '@/components/Sandpack';

const COMPONENT_MAP = {
  Sandpack,
  pre: CodeSnippet,
  a: PrimaryNewTabLink,
  h2: SectionHeading,
};

export default COMPONENT_MAP;
