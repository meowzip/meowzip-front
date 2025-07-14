'use client';

import { useEffect } from 'react';

export default function GlobalError({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Global Error:', error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
          <div className="w-full max-w-md text-center">
            <div className="mb-8">
              <div className="mb-4 inline-flex h-20 w-20 items-center justify-center rounded-full bg-red-100">
                <svg
                  className="h-10 w-10 text-red-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h1 className="mb-2 text-2xl font-bold text-gray-900">
                앗, 문제가 발생했어요!
              </h1>
              <p className="mb-6 text-gray-600">
                예상치 못한 오류가 발생했습니다.
                <br />
                잠시 후 다시 시도해주세요.
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={reset}
                className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors hover:bg-blue-700"
              >
                다시 시도하기
              </button>

              <button
                onClick={() => (window.location.href = '/')}
                className="w-full rounded-lg bg-gray-100 px-4 py-3 font-medium text-gray-700 transition-colors hover:bg-gray-200"
              >
                홈으로 돌아가기
              </button>
            </div>

            {process.env.NODE_ENV === 'development' && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Developer Info
                </summary>
                <pre className="mt-2 overflow-auto rounded bg-gray-100 p-3 text-xs text-gray-600">
                  {error.message}
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      </body>
    </html>
  );
}
