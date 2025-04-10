'use client';

import { useEffect } from 'react';
import Button from '@/components/ui/Button';

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
          <h1 className="text-xl font-bold text-gr-900">
            이런! 문제가 발생했어요
          </h1>
          <p className="text-sm text-gr-600">{error.message}</p>
        </div>

        <div className="flex justify-center gap-5">
          <Button
            onClick={() => reset()}
            className="w-full rounded-md border border-gr-500 p-2"
          >
            <Button.Text
              text="다시 시도하기"
              className="text-body-3 text-gr-900"
            />
          </Button>
          <Button
            onClick={() => (window.location.href = '/')}
            className="w-full rounded-md border border-gr-500 p-2"
          >
            <Button.Text
              text="홈으로 돌아가기"
              className="text-body-3 text-gr-900"
            />
          </Button>
        </div>
      </div>
    </div>
  );
}
