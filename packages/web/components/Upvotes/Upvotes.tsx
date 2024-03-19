'use client';

import styles from './Upvotes.module.css';
import { ThumbsUp } from 'react-feather';
import clsx from 'clsx';
import { useState, useCallback } from 'react';
import debounce from '@/utils/debounce';

interface Props {
  votes: number;
  incrementVotes: () => Promise<void>;
  className?: string;
}

const MAX_VOTES = 16;

const Upvotes = ({ votes, className, incrementVotes }: Props) => {
  const [isPending, setIsPending] = useState(false);
  const [optimisticVotes, setOptimisticVotes] = useState(votes);
  const isMaxedOut = optimisticVotes === MAX_VOTES;

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
      onClick={async () => {
        if (!isPending) {
          setIsPending(true);
        }

        setOptimisticVotes(optimisticVotes + 1);

        stableDebouncedHandleIncrementVotes();
      }}
      disabled={isMaxedOut}
    >
      <ThumbsUp size="1.5rem" />
      {optimisticVotes}
      {isPending && <span>...</span>}
      {isMaxedOut && <span className={styles.max}>MAX</span>}
    </button>
  );
};

export default Upvotes;
