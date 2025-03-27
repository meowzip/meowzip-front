import { useState, useEffect } from 'react';
import { WebViewMessage, WebViewMessageType } from '@/types/webview';

export const usePushToken = () => {
  const [fcmToken, setFcmToken] = useState<string | null>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      try {
        const message = JSON.parse(event.data) as WebViewMessage;
        if (message.type === WebViewMessageType.PUSH_TOKEN && message.token) {
          console.log('Received push token:', message.token);
          setFcmToken(message.token);
          localStorage.setItem('fcm_token', message.token);
        }
      } catch (e) {
        console.error('Error parsing message from app:', e);
      }
    };

    const storedToken = localStorage.getItem('fcm_token');
    if (storedToken) {
      setFcmToken(storedToken);
    }

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

  return { fcmToken };
};
