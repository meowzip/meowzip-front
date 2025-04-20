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
        console.log('event.data', event.data);
        if (
          message.type === WebViewMessageType.NOTIFICATION_PERMISSION &&
          message.enabled
        ) {
          setPushPermissionEnabled(message.enabled);
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

    if (platform !== 'Web') {
      window.addEventListener('message', handleMessage);

      return () => {
        window.removeEventListener('message', handleMessage);
      };
    }
  }, [platform, safePostMessage]);

  return { pushPermissionEnabled };
};
