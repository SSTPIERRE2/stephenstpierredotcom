'use client';

import styles from './Upvotes.module.css';
import { ThumbsUp } from 'react-feather';
import clsx from 'clsx';
import { useOptimistic, useTransition } from 'react';

interface Props {
  votes: number;
  incrementVotes: () => Promise<void>;
  className?: string;
}

const MAX_VOTES = 16;

const Upvotes = ({ votes, className, incrementVotes }: Props) => {
  const [isPending, startTransition] = useTransition();
  const [optimisticVotes, addOptimisticVote] = useOptimistic<number, number>(
    votes,
    (_current, next) => next,
  );
  const isMaxedOut = optimisticVotes === MAX_VOTES;

  return (
    <button
      className={clsx(styles.wrapper, className)}
      onClick={async () => {
        startTransition(() => {
          addOptimisticVote(votes + 1);
        });

        await incrementVotes();
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
