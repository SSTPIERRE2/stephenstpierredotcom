import { useEffect, useRef, useState } from 'react';

function useIsOnscreen() {
  const [isOnscreen, setIsOnscreen] = useState(false);

  const elementRef = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      console.log('observing!', entry.isIntersecting);

      setIsOnscreen(entry.isIntersecting);
    });

    console.log(`observer`, elementRef.current);

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return [isOnscreen, elementRef];
}

export default useIsOnscreen;
