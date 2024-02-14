'use client';

import { headingLink } from '@/utils/constant';
import styles from './TableOfContents.module.css';
import { useEffect, useRef, useState } from 'react';
import SupportingLink from '../SupportingLink';

interface Props {
  links: headingLink[];
  slug: string;
}

const titleLink: headingLink = {
  id: 'title',
  text: 'Introduction',
};

const getIsOnScreen = (element: Element) => {
  const { top, left, bottom, right } = element.getBoundingClientRect();
  return top >= 0 && left >= 0 && bottom <= innerHeight && right <= innerWidth;
};

const TableOfContents = ({ links, slug }: Props) => {
  const [activeSection, setActiveSection] = useState<string>();
  const activeRef = useRef<string>();

  const updateActiveState = (state: string) => {
    setActiveSection(state);
    activeRef.current = state;
  };

  useEffect(() => {
    let lastScrollTop = 0;
    let scrollDirection: 'up' | 'down';

    const handleScroll = () => {
      const current = window.scrollY;
      if (current > lastScrollTop) {
        scrollDirection = 'down';
      } else if (current < lastScrollTop) {
        scrollDirection = 'up';
      }
      lastScrollTop = current <= 0 ? 0 : current;
    };

    window.addEventListener('scroll', handleScroll);

    const observer = new IntersectionObserver((entries) => {
      /**
       * On page load there will be more than one entry, so just grab the first one.
       * Afterwards, only one entry is observed at a time.
       */
      if (entries.length > 1) {
        const sectionsOnScreen: string[] = [];

        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            sectionsOnScreen.push(entry.target.id);
          }
        });

        updateActiveState(sectionsOnScreen[0]);
      } else {
        entries.forEach((entry) => {
          const sectionId = entry.target.id;

          // when a section appears, only set it as the active section if the currently active section is not on screen
          if (entry.isIntersecting && activeRef.current) {
            const linkIdsWithTitle = ['title', ...links.map((link) => link.id)];
            const sectionIndex = linkIdsWithTitle.findIndex(
              (id) => id === sectionId,
            );
            const currentActiveElement = document.querySelector(
              `#${activeRef.current}`,
            ) as Element;
            const isOnScreen = getIsOnScreen(currentActiveElement);

            console.log(
              `section appeared`,
              sectionId,
              sectionIndex,
              links.length - 1,
            );

            if (sectionIndex === 0 || sectionIndex === links.length - 1) {
              updateActiveState(sectionId);
            } else if (!isOnScreen) {
              updateActiveState(sectionId);
            }
          } else if (!entry.isIntersecting && sectionId === activeRef.current) {
            /**
             * When the active section disappears
             * depending on scroll direction if the next section is on screen, set that as the active one
             * if the next section isn't on screen do nothing
             */
            const activeIndex = links.findIndex(
              (link) => link.id === activeRef.current,
            );

            console.log(sectionId, `just went offscreen`);

            if (scrollDirection === 'down') {
              const nextSection = links[activeIndex + 1]?.id;

              if (nextSection) {
                const nextSectionElement = document.querySelector(
                  `#${nextSection}`,
                ) as Element;
                const isOnScreen = getIsOnScreen(nextSectionElement);

                if (isOnScreen) {
                  updateActiveState(nextSection);
                }
              }
            }

            if (scrollDirection === 'up') {
              const prevSection = links[activeIndex - 1]?.id;

              if (prevSection) {
                updateActiveState(prevSection);
              }
            }
          }
        });
      }
    });
    const sectionIds = links.map((link) => `#${link.id}`);
    const sectionElements = document.querySelectorAll(
      ['#title', ...sectionIds].join(', '),
    );

    sectionElements.forEach((element) => {
      observer.observe(element);
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      observer.disconnect();
    };
  }, [links]);

  return (
    <nav className={styles.wrapper}>
      <h3 className={styles.header}>TABLE OF CONTENTS</h3>
      {[titleLink, ...links].map(({ id, text }) => (
        <SupportingLink
          key={id}
          href={`/blog/${slug}#${id}`}
          active={activeSection === id}
        >
          {text}
        </SupportingLink>
      ))}
    </nav>
  );
};

export default TableOfContents;
