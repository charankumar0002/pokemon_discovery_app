import React, { useEffect, useRef } from 'react';

export default function InfiniteScrollTrigger({ onVisible }) {
  const ref = useRef();

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) onVisible();
    });

    if (ref.current) observer.observe(ref.current);

    return () => {
      if (ref.current) observer.disconnect();
    };
  }, [onVisible]);

  return <div ref={ref} className="h-1" />;
}
