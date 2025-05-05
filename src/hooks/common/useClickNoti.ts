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
        const message: WebViewMessage =
          typeof event.data === 'string' ? JSON.parse(event.data) : event.data;
        // const message = JSON.parse(event.data) as WebViewMessage;
        if (
          message.type === WebViewMessageType.NOTIFICATION_CLICKED &&
          message.notification
        ) {
          setNotification(message.notification);
          localStorage.setItem(
            'click_noti',
            JSON.stringify(message.notification)
          );
          safePostMessage({
            type: 'NOTIFICATION_CLICKED',
            notification: JSON.stringify(message.notification),
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
    const parsedNotification = storedClickNoti
      ? JSON.parse(storedClickNoti)
      : null;
    if (storedClickNoti) {
      setNotification(parsedNotification);
      safePostMessage({
        type: 'NOTIFICATION_CLICKED',
        notification: parsedNotification,
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
