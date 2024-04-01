import { useEffect, useMemo } from 'react';

const useAbortController = () => {
  const controller = new AbortController();

  useEffect(() => {
    console.log(`useAbortController effect...`, controller.signal);

    return () => {
      console.log(`useAbortController unmounted, aborting request...`);

      controller.abort();
    };
  }, []);
  return controller.signal;
};

export default useAbortController;
