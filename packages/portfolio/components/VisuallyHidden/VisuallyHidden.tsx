import clsx from 'clsx';
import styles from './VisuallyHidden.module.css';
import { PropsWithChildren } from 'react';

interface Props {
  as?: React.ElementType;
  className?: string;
}

const VisuallyHidden = ({
  as: Element = 'span',
  className,
  children,
  ...delegated
}: Props & PropsWithChildren) => {
  return (
    <Element className={clsx(styles.wrapper, className)} {...delegated}>
      {children}
    </Element>
  );
};

export default VisuallyHidden;
