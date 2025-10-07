import { useCallback } from 'react';
import { toast } from '@/components/ui/hooks/useToast';
import { sendDiscordErrorLog } from '@/lib/discord';

interface ErrorHandlerOptions {
  title?: string;
  showToast?: boolean;
  logToDiscord?: boolean;
  onError?: (error: Error) => void;
}

export function useErrorHandler(options: ErrorHandlerOptions = {}) {
  const {
    title = '오류가 발생했습니다',
    showToast = true,
    logToDiscord = true,
    onError
  } = options;

  const handleError = useCallback(
    async (error: unknown) => {
      const errorMessage =
        error instanceof Error
          ? error.message
          : '알 수 없는 오류가 발생했습니다';

      console.error('Error:', error);

      if (showToast) {
        toast({
          title,
          description: errorMessage
        });
      }

      if (logToDiscord && error instanceof Error) {
        await sendDiscordErrorLog(
          `${title}: ${errorMessage}\nStack: ${error.stack}`,
          typeof window !== 'undefined' ? window.location.href : 'server'
        );
      }

      if (onError && error instanceof Error) {
        onError(error);
      }
    },
    [title, showToast, logToDiscord, onError]
  );

  return { handleError };
}
