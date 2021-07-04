import { useRef, useCallback } from 'react';

const defaultOptions = {
  root: null,
  threshold: 0,
  rootMargin: '0px 0px 500px 0px'
};

const useIntersectionObserver = (
  callback: () => void,
  isLoading: boolean,
  options = defaultOptions
) => {
  const observer = useRef<null | IntersectionObserver>(null);

  const containerRef = useCallback(
    (element) => {
      if (isLoading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries.every((entry) => entry.isIntersecting)) {
          callback();
        }
      }, options);
      if (element) observer.current.observe(element);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [isLoading, options] // do not include callback in deps because that gets re-written on every fetch, which causes duplicate fetches
  );

  return containerRef;
};

export default useIntersectionObserver;
