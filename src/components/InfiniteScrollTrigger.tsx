import { useEffect, useRef } from 'react';

interface InfiniteScrollTriggerProps {
  onVisible: () => void;
}

export default function InfiniteScrollTrigger({ onVisible }: InfiniteScrollTriggerProps) {
  const ref = useRef<HTMLDivElement>(null);

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