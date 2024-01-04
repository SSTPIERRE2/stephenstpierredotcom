'use client';

import { useEffect, useRef } from 'react';
import LogRocket from 'logrocket';

interface Props {
  appId: string;
}

const Logrocket = ({ appId }: Props) => {
  const isInitialized = useRef(false);

  useEffect(() => {
    if (!isInitialized.current && !!appId) {
      LogRocket.init(appId);
      isInitialized.current = true;
    }
  }, [appId]);

  return null;
}

export default Logrocket;