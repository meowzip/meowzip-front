'use client';

import React, { ErrorInfo } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { QueryErrorResetBoundary } from '@tanstack/react-query';
import ErrorFallback from './ErrorFallback';
import { sendDiscordErrorLog } from '@/lib/discord';

interface AppErrorBoundaryProps {
  children: React.ReactNode;
  minimal?: boolean;
  fallback?: React.ComponentType<any>;
}

export default function AppErrorBoundary({
  children,
  minimal = false,
  fallback
}: AppErrorBoundaryProps) {
  const handleError = (error: Error, info: ErrorInfo) => {
    console.error('ErrorBoundary caught an error:', error, info);

    const errorMessage = `
[Client Error Boundary]
Error: ${error.message}
Stack: ${error.stack}
Component Stack: ${info.componentStack || 'N/A'}
    `.trim();

    sendDiscordErrorLog(errorMessage, window.location.href);
  };

  const FallbackComponent = fallback || ErrorFallback;

  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          FallbackComponent={props => (
            <FallbackComponent {...props} minimal={minimal} />
          )}
          onError={handleError}
          onReset={reset}
        >
          {children}
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}
