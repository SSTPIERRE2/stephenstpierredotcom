import { useEffect, useRef, useState } from 'react';

const useIsOnscreen = <E extends Element>() => {
  const [isOnscreen, setIsOnscreen] = useState(false);

  const elementRef = useRef<E>(null);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const [entry] = entries;

      setIsOnscreen(entry.isIntersecting);
    });

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return [isOnscreen, elementRef] as const;
};

export default useIsOnscreen;
