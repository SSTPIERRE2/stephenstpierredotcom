'use client';

import range from '@/utils/range';
import styles from './PageViews.module.css';
import { incrementViews } from '@/app/actions/incrementViews';
import { useEffect, useState } from 'react';

interface Props {
  postSlug: string;
  initialViews: number;
}

const getDisplay = (views: number) => {
  const MAX_LENGTH = 6;
  const zerosToAdd = MAX_LENGTH - String(views).length;
  let display = '';

  range(zerosToAdd).forEach(() => {
    display += '0';
  });

  return display + views;
};

const PageViews = async ({ postSlug, initialViews }: Props) => {
  const [views, setViews] = useState(initialViews);

  useEffect(() => {
    async function updateViews() {
      try {
        const newViews = await incrementViews(postSlug);
        if (newViews) setViews(newViews);
      } catch (err) {
        console.error('Failed to increment views:', err);
      }
    }
    updateViews();
  }, [postSlug]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.inner}>
        <span>{getDisplay(views)}</span>
      </div>
    </div>
  );
};

export default PageViews;
