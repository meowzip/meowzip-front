'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/button';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="space-y-6 text-center">
        <div className="space-y-2">
          <h1 className="text-4xl font-bold text-gray-900">
            이런! 문제가 발생했어요
          </h1>
          <p className="text-lg text-gray-600">{error.message}</p>
        </div>

        <div className="space-y-4">
          <Button onClick={() => reset()} className="px-6 py-2">
            다시 시도하기
          </Button>

          <div>
            <Button
              onClick={() => (window.location.href = '/')}
              className="px-6 py-2"
            >
              홈으로 돌아가기
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
