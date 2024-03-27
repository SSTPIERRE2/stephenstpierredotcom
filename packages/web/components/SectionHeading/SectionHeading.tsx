'use client';

import Link from 'next/link';
import styles from './SectionHeading.module.css';
import { Link as LinkIcon } from 'react-feather';
import slugify from '@/utils/slugify';
import { usePathname } from 'next/navigation';
import { HTMLAttributes } from 'react';

const SectionHeading = ({ children }: HTMLAttributes<HTMLHeadingElement>) => {
  const path = usePathname();
  const id = slugify(children as string);

  return (
    <h2 id={id} className={styles.heading}>
      {children}
      <Link href={`${path}#${id}`} className={styles.link} prefetch={false}>
        <LinkIcon />
      </Link>
    </h2>
  );
};

export default SectionHeading;
