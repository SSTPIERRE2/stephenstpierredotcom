'use client';

import { headingLink } from '@/utils/constant';
import styles from './TableOfContents.module.css';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface Props {
  links: headingLink[];
  slug: string;
}

const TableOfContents = ({ links, slug }: Props) => {
  const [activeSection, setActiveSection] = useState<string>();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const sectionId = entry.target.id;
        if (entry.isIntersecting) {
          console.log(`setting active section`, sectionId);

          setActiveSection(sectionId);
        }
      })
    });
    const sectionElements = document.querySelectorAll('[id^="section"]');

    console.log(`got sectionElements`, sectionElements);

    sectionElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      observer.disconnect();
    }
  }, []);

  return (
    <nav className={styles.wrapper}>
      <h2 className={styles.header}>TABLE OF CONTENTS</h2>
      <Link href={`/blog/${slug}#section-title`} className={activeSection === 'section-title' ? styles.activeLink : styles.link}>
        Introduction
      </Link>
      {links.map(({ id, text }) => (
        <Link key={id} href={`/blog/${slug}#${id}`} className={activeSection === id ? styles.activeLink : styles.link}>
          {text}
        </Link>
      ))}
    </nav>
  );
};

export default TableOfContents;
