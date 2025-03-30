import { useState, useEffect } from 'react';
import { WebViewMessage, WebViewMessageType } from '@/types/webview';
import { useWebView } from '@/hooks/useWebView';

export const usePushToken = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);
  const { platform, safePostMessage } = useWebView();

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      // react-devtools-bridge 메시지는 무시
      if (
        event.source === window &&
        event.data?.source === 'react-devtools-bridge'
      ) {
        return;
      }

      try {
        const message = JSON.parse(event.data) as WebViewMessage;
        if (message.type === WebViewMessageType.PUSH_TOKEN && message.token) {
          console.log('Received push token:', message.token);
          setFcmToken(message.token);
          localStorage.setItem('fcm_token', message.token);

          safePostMessage({
            type: 'TOKEN_SET_SUCCESS',
            token: message.token,
            timestamp: new Date().toISOString()
          });
        }
      } catch (e) {
        if (!event.data?.source?.includes('react-devtools')) {
          console.error('Error parsing message from app:', e);
        }
      }
    };

    const storedToken = localStorage.getItem('fcm_token');
    if (storedToken) {
      setFcmToken(storedToken);
      safePostMessage({
        type: 'PUSH_TOKEN_RECEIVED',
        token: storedToken,
        timestamp: new Date().toISOString()
      });
    }

    if (platform !== 'Web') {
      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [platform, safePostMessage]);

  return { fcmToken };
};
