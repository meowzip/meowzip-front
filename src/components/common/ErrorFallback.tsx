'use client';

import React from 'react';
import Button from '@/components/ui/Button';
import { FallbackProps } from 'react-error-boundary';

interface ErrorFallbackProps extends FallbackProps {
  minimal?: boolean;
}

export default function ErrorFallback({
  error,
  resetErrorBoundary,
  minimal = false
}: ErrorFallbackProps) {
  if (minimal) {
    return (
      <div className="flex min-h-[200px] flex-col items-center justify-center gap-4 p-6">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            {error?.message || '문제가 발생했습니다.'}
          </p>
        </div>
        <Button
          onClick={resetErrorBoundary}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          다시 시도
        </Button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
      <div className="flex flex-col items-center gap-2">
        <h2 className="text-xl font-bold text-gray-900">
          앗! 문제가 발생했습니다
        </h2>
        <p className="text-center text-sm text-gray-600">
          {error?.message || '예상치 못한 오류가 발생했습니다.'}
        </p>
      </div>

      {process.env.NODE_ENV === 'development' && error?.stack && (
        <details className="w-full max-w-md rounded-lg border border-gray-200 bg-gray-50 p-4">
          <summary className="cursor-pointer text-sm font-medium text-gray-700">
            에러 상세 정보 (개발 모드)
          </summary>
          <pre className="mt-2 overflow-auto text-xs text-gray-600">
            {error.stack}
          </pre>
        </details>
      )}

      <div className="flex gap-3">
        <Button
          onClick={resetErrorBoundary}
          className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white hover:bg-primary/90"
        >
          다시 시도
        </Button>
        <Button
          onClick={() => {
            window.location.href = '/';
          }}
          className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
        >
          홈으로 이동
        </Button>
      </div>
    </div>
  );
}
