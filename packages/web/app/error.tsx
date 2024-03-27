'use client';

import { useEffect } from 'react';
import LogRocket from 'logrocket';
import Button from '@/components/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    LogRocket.captureException(error);
  }, [error]);

  return (
    <div
      style={{
        paddingTop: '96px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
      }}
    >
      <h2>Something went wrong!</h2>
      <Button onClick={() => reset()}>Try again</Button>
    </div>
  );
}
