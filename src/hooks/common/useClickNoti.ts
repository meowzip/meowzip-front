import { useEffect, useState } from 'react';
import { WebViewMessage, WebViewMessageType } from '@/types/webview';
import { useWebView } from '@/hooks/useWebView';

export const useClickNoti = () => {
  const [notification, setNotification] = useState({
    url: '',
    'notification-id': 0,
    type: ''
  });
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
        const rawData = event.data;
        const message: WebViewMessage =
          typeof rawData === 'string' ? JSON.parse(rawData) : rawData;
        if (
          message.type === WebViewMessageType.NOTIFICATION_CLICKED &&
          message.notification
        ) {
          console.log('=== message.notification', message.notification);
          setNotification(message.notification);
          localStorage.setItem('click_noti', message.notification);
          safePostMessage({
            type: 'NOTIFICATION_CLICKED',
            notification: message.notification,
            timestamp: new Date().toISOString()
          });
        }
      } catch (e) {
        if (!event.data?.source?.includes('react-devtools')) {
          console.error('Error parsing message from app:', e);
        }
      }
    };

    const storedClickNoti = localStorage.getItem('click_noti');
    if (storedClickNoti) {
      setNotification(JSON.parse(storedClickNoti));
      safePostMessage({
        type: 'NOTIFICATION_CLICKED',
        notification: storedClickNoti,
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

  return { notification };
};
