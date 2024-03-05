import CodeSnippet from '@/components/CodeSnippet';
import SectionHeading from '@/components/SectionHeading';
import { PrimaryNewTabLink } from '@/components/PrimaryLink';
import Sandpack from '@/components/Sandpack';
import DynamicGapDemo from '@/components/demos/css/grid/DynamicGap';
import DynamicRowDemo from '@/components/demos/css/grid/DynamicRow';
import NotFoundDemo from '@/components/demos/css/grid/NotFound';
import StickySidebarDemo from '@/components/demos/css/grid/StickySidebar';
import InlineCode from '@/components/InlineCode';

const COMPONENT_MAP = {
  Sandpack,
  pre: CodeSnippet,
  a: PrimaryNewTabLink,
  h2: SectionHeading,
  InlineCode,
  DynamicGapDemo,
  DynamicRowDemo,
  NotFoundDemo,
  StickySidebarDemo,
};

export default COMPONENT_MAP;
