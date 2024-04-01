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

const MAX_VOTES = 16;

const Upvotes = ({ initialVotes, className, incrementVotes }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [optimisticVotes, setOptimisticVotes] = useState(initialVotes);
  const isMaxedOut = optimisticVotes === MAX_VOTES;

  // This function doesn't need any dependencies
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const stableDebouncedHandleIncrementVotes = useCallback(
    debounce(async () => {
      await incrementVotes();
      setIsPending(false);
    }, 300),
    [],
  );

  return (
    <button
      className={clsx(styles.wrapper, className)}
      onClick={() => {
        if (!isPending) {
          setIsPending(true);
        }

        setOptimisticVotes(optimisticVotes + 1);

        stableDebouncedHandleIncrementVotes();
      }}
      disabled={isMaxedOut}
    >
      <ThumbsUp size="1.5rem" />
      <VisuallyHidden>Upvote this post</VisuallyHidden>
      {optimisticVotes}
      {isPending && <span>...</span>}
      {isMaxedOut && <span className={styles.max}>MAX</span>}
    </button>
  );
};

export default Upvotes;
