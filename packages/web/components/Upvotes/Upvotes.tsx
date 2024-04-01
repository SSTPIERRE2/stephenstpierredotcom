'use client';

import styles from './Upvotes.module.css';
import { ThumbsUp } from 'react-feather';
import clsx from 'clsx';
import { useState, useCallback } from 'react';
import debounce from '@/utils/debounce';
import VisuallyHidden from '../VisuallyHidden';

interface Props {
  initialVotes: number;
  incrementVotes: () => Promise<number>;
  className?: string;
}

const Upvotes = ({ initialVotes, className, incrementVotes }: Props) => {
  const [optimisticVotes, setOptimisticVotes] = useState(initialVotes);
  const [wasClicked, setWasClicked] = useState(false);

  // This function doesn't need any dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableDebouncedHandleIncrementVotes = useCallback(
    debounce(async () => {
      await incrementVotes();
    }, 300),
    [],
  );

  return (
    <div className={clsx(styles.wrapper, className)}>
      <h4 className={styles.heading}>Like this post?</h4>
      <button
        className={styles.button}
        onClick={() => {
          setOptimisticVotes(optimisticVotes + 1);
          stableDebouncedHandleIncrementVotes();
          if (!wasClicked) {
            setWasClicked(true);
          }
        }}
      >
        <ThumbsUp size="1.5rem" />
        <VisuallyHidden>Upvote this post</VisuallyHidden>
        {optimisticVotes}
      </button>
      {wasClicked && <span className={styles.max}>Thanks for supporting!</span>}
    </div>
  );
};

export default Upvotes;
