import { useCallback, useEffect, useState } from 'react';
import { useWebView } from '@/hooks/useWebView';
import { type WebViewMessage } from '@/utils/userAgent';

export const useClickNoti = () => {
  const { platform, safePostMessage } = useWebView();
  const [notification, setNotification] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('click_noti');
      return saved
        ? JSON.parse(saved)
        : { type: '', 'notification-id': 0, url: '' };
    }
    return { type: '', 'notification-id': 0, url: '' };
  });

  const handleClickNotiReceived = useCallback(
    (event: CustomEvent) => {
      console.log('😃 알림 클릭 이벤트 수신:', {
        platform,
        eventType: event.type,
        notification: event.detail?.notification
      });

      if (platform === 'Web') {
        console.log('[웹] 웹 환경에서는 알림 클릭 이벤트를 처리하지 않습니다.');
        return;
      }

      if (event.detail?.notification) {
        setNotification(event.detail.notification);
        safePostMessage({
          type: 'NOTIFICATION_CLICKED',
          notification: event.detail.notification,
          timestamp: 666666
        });
      } else {
        console.warn('[웹→앱] 알림 클릭 이벤트 수신 에러');
        safePostMessage({
          type: 'NOTIFICATION_CLICKED',
          error: '알림 클릭 이벤트 수신 에러',
          timestamp: new Date().toISOString()
        });
      }
    },
    [platform, safePostMessage]
  );

  useEffect(() => {
    if (platform === 'Web') {
      console.log('[웹] 웹 환경에서는 이벤트 리스너를 등록하지 않습니다.');
      return;
    }

    const clickNotiListener = handleClickNotiReceived as EventListener;
    window.addEventListener('clickNotificationReceived', clickNotiListener);

    return () => {
      window.removeEventListener('message', clickNotiListener);
    };
  }, [platform, safePostMessage, handleClickNotiReceived]);

  return { notification };
};
