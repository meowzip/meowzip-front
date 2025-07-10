import { useEffect, useState, useCallback } from 'react';
import { useWebView, WEBVIEW_MESSAGE_TYPES } from '@/hooks/useWebView';

export const usePushAlarmPermission = () => {
  const { platform, safePostMessage } = useWebView();
  const [permission, setPermission] = useState<boolean>(false);

  const requestPushPermissionReceived = useCallback(
    (event: CustomEvent) => {
      console.log('🍋 푸시 알림 여부 이벤트 수신:', {
        platform,
        eventType: event.type,
        enabled: event.detail?.enabled
      });

      if (platform === 'Web') {
        console.log(
          '[웹] 웹 환경에서는 푸시 알림 여부 이벤트를 처리하지 않습니다.'
        );
        return;
      }

      setPermission(event.detail?.enabled === 'granted' ? true : false);
      safePostMessage({
        type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_PERMISSION,
        enabled: event.detail?.enabled,
        timestamp: new Date().toISOString()
      });
    },
    [platform, safePostMessage]
  );

  useEffect(() => {
    if (platform === 'Web') {
      console.log('[웹] 웹 환경에서는 이벤트 리스너를 등록하지 않습니다.');
      return;
    }

    const pushPermissionListener =
      requestPushPermissionReceived as EventListener;
    window.addEventListener('pushPermissionReceived', pushPermissionListener);

    return () => {
      console.log('[웹→앱] 이벤트 리스너 제거');
      window.removeEventListener(
        'pushPermissionReceived',
        pushPermissionListener
      );
    };
  }, [platform, safePostMessage, requestPushPermissionReceived]);

  return { requestPushPermissionReceived, permission };
};
