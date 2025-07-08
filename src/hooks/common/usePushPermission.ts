import { useEffect, useState } from 'react';
import { WebViewMessage, WebViewMessageType } from '@/types/webview';
import { useWebView } from '@/hooks/useWebView';

export const usePushPermission = () => {
  const [pushPermissionEnabled, setPushPermissionEnabled] = useState('');
  const { platform, safePostMessage } = useWebView();
  const isClient = typeof window !== 'undefined';

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
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
          console.log('=====message.enabled', message.enabled);
          setPushPermissionEnabled(message.enabled);
          if (isClient) {
            localStorage.setItem('push_permission', message.enabled);
          }
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

    const storedPushPermission = isClient
      ? localStorage.getItem('push_permission')
      : null;
    if (storedPushPermission) {
      setPushPermissionEnabled(storedPushPermission);
      safePostMessage({
        type: 'NOTIFICATION_PERMISSION',
        enabled: storedPushPermission,
        timestamp: new Date().toISOString()
      });
    }

    if (platform !== 'Web' && isClient) {
      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [platform, safePostMessage]);

  return { pushPermissionEnabled };
};
