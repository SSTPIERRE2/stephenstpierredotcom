/* eslint-disable react-hooks/exhaustive-deps */
// executeMutation doesn't change ever
'use client';

import debounce, { handleCursorThrash } from '../utils/debounce';
import { useCreateAnalytic } from '@/hooks/useAnalytics';
import { ReactNode, useEffect } from 'react';

const AnalyticsWrapper = ({ children }: { children: ReactNode }) => {
  const { createAnalytic } = useCreateAnalytic();

  useEffect(() => {
    console.log(
      'hello analytics wrapper',
      document.referrer,
      window.location.hostname
    );
    if (document.referrer.indexOf(window.location.hostname) == -1) {
      console.log(
        'first page view from either direct url navigation or from a link from another website!'
      );
      // createAnalytic({
      //   name: 'pageView',
      // });
    }
  }, []);

  useEffect(() => {
    const handleRageClick = debounce(
      (event: MouseEvent, numOfClicks: number) => {
        console.log('handleClick', event, numOfClicks);
        if (numOfClicks >= 3) {
          console.log('recording rage click');
          // createAnalytic({
          //   name: 'rageClick',
          //   metadata: JSON.stringify({
          //     numOfClicks,
          //     clientX: event.clientX,
          //     clientY: event.clientY,
          //   }),
          // });
        }
      },
      1500
    );

    window.addEventListener('click', handleRageClick);

    return () => {
      window.removeEventListener('click', handleRageClick);
    };
  }, []);

  useEffect(() => {
    const onMouseMove = handleCursorThrash(
      (
        e: MouseEvent,
        didThrash: boolean,
        timeElapsed: number,
        numOfThrashes: number
      ) => {
        console.log('onMouseMove', didThrash, timeElapsed, numOfThrashes);
        if (didThrash) {
          // createAnalytic({
          //   name: 'cursorThrash',
          //   metadata: JSON.stringify({
          //     clientX: e.clientX,
          //     clientY: e.clientY,
          //   }),
          // });
        }
      },
      1500
    );

    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
    };
  }, []);

  return children as JSX.Element;
};

export default AnalyticsWrapper;
