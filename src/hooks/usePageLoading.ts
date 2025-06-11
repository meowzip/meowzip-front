'use client';

import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

export function usePageLoading() {
  const [isLoading, setIsLoading] = useState(false);
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    let showLoadingTimer: NodeJS.Timeout;
    let hideLoadingTimer: NodeJS.Timeout;

    const handleStart = () => {
      // 500ms 후에만 로딩 상태 활성화 (빠른 로딩 시 로딩 화면 안 보임)
      showLoadingTimer = setTimeout(() => {
        setIsLoading(true);
      }, 500);
    };

    const handleComplete = () => {
      // 로딩 타이머 취소하고 로딩 상태 해제
      clearTimeout(showLoadingTimer);
      setIsLoading(false);
    };

    handleStart();

    // 컴포넌트가 마운트된 후 로딩 완료 처리
    hideLoadingTimer = setTimeout(handleComplete, 100);

    return () => {
      clearTimeout(showLoadingTimer);
      clearTimeout(hideLoadingTimer);
    };
  }, [pathname, searchParams]);

  return isLoading;
}
