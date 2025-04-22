import { useEffect, useState } from 'react';
import { WebViewMessage, WebViewMessageType } from '@/types/webview';
import { useWebView } from '@/hooks/useWebView';

export const usePushPermission = () => {
  const [pushPermissionEnabled, setPushPermissionEnabled] = useState('');
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
        if (
          message.type === WebViewMessageType.NOTIFICATION_PERMISSION &&
          message.enabled
        ) {
          setPushPermissionEnabled(message.enabled);
          localStorage.setItem('pushPermission', message.enabled);
          safePostMessage({
            type: 'NOTIFICATION_PERMISSION',
            enabled: message.enabled,
            timestamp: new Date().toISOString()
          });
        }
      } catch (e) {
        if (!event.data?.source?.includes('react-devtools')) {
          console.error('Error parsing message from app:', e);
        }
      }
    };

    const storedPushPermission = localStorage.getItem('pushPermission');
    if (storedPushPermission) {
      setPushPermissionEnabled(storedPushPermission);
      safePostMessage({
        type: 'NOTIFICATION_PERMISSION',
        token: storedPushPermission,
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

  return { pushPermissionEnabled };
};
