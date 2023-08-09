'use client';

import debounce, { handleCursorThrash } from '../utils/debounce';
import { useCreateAnalytic } from '@/hooks/useAnalytics';
import { ReactNode, useEffect } from 'react';

const AnalyticsWrapper = ({ children }: { children: ReactNode }) => {
  const { createAnalytic, result } = useCreateAnalytic();

  console.log(`createAnalytic result`, result);

  useEffect(() => {
    console.log(
      'hello analytics wrapper',
      document.referrer,
      window.location.hostname
    );
    if (document.referrer.indexOf(window.location.hostname) === -1) {
      console.log(
        'first page view from either direct url navigation or from a link from another website!'
      );
      createAnalytic({
        name: 'pageView',
      });
    }
  }, [createAnalytic]);

  // useEffect(() => {
  //   const handleRageClick = debounce(
  //     (
  //       { clientX, clientY, target, ...rest }: MouseEvent,
  //       numOfClicks: number
  //     ) => {
  //       console.log(
  //         'handleClick',
  //         rest,
  //         numOfClicks,
  //         target instanceof HTMLElement && target.className
  //       );

  //       if (numOfClicks >= 3) {
  //         console.log('recording rage click');
  //         createAnalytic({
  //           name: 'rageClick',
  //           metadata: JSON.stringify({
  //             numOfClicks,
  //             clientX,
  //             clientY,
  //             target: target instanceof HTMLElement && target.className,
  //           }),
  //         });
  //       } else {
  //         createAnalytic({
  //           name: 'click',
  //           metadata: JSON.stringify({
  //             numOfClicks,
  //             clientX,
  //             clientY,
  //             target: target instanceof HTMLElement && target.className,
  //           }),
  //         });
  //       }
  //     },
  //     500
  //   );

  //   window.addEventListener('click', handleRageClick);

  //   return () => {
  //     window.removeEventListener('click', handleRageClick);
  //   };
  // }, [createAnalytic]);

  // useEffect(() => {
  //   const onMouseMove = handleCursorThrash(
  //     (
  //       e: MouseEvent,
  //       didThrash: boolean,
  //       timeElapsed: number,
  //       numOfThrashes: number,
  //       numOfDirectionChanges: number
  //     ) => {
  //       console.log(
  //         'onMouseMove',
  //         didThrash,
  //         timeElapsed,
  //         numOfThrashes,
  //         numOfDirectionChanges
  //       );
  //       if (didThrash) {
  //         createAnalytic({
  //           name: 'cursorThrash',
  //           metadata: JSON.stringify({
  //             clientX: e.clientX,
  //             clientY: e.clientY,
  //             timeElapsed,
  //             numOfThrashes,
  //             numOfDirectionChanges,
  //           }),
  //         });
  //       }
  //     }
  //   );

  //   window.addEventListener('mousemove', onMouseMove);

  //   return () => {
  //     window.removeEventListener('mousemove', onMouseMove);
  //   };
  // }, [createAnalytic]);

  return children as JSX.Element;
};

export default AnalyticsWrapper;
