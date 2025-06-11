'use client';

import { Suspense, ReactNode, useState, useEffect } from 'react';

interface DelayedSuspenseProps {
  children: ReactNode;
  fallback: ReactNode;
  delay?: number;
}

const DelayedFallback = ({
  fallback,
  delay = 200
}: {
  fallback: ReactNode;
  delay: number;
}) => {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return showFallback ? <>{fallback}</> : null;
};

const DelayedSuspense = ({
  children,
  fallback,
  delay = 200
}: DelayedSuspenseProps) => {
  return (
    <Suspense fallback={<DelayedFallback fallback={fallback} delay={delay} />}>
      {children}
    </Suspense>
  );
};

export default DelayedSuspense;
