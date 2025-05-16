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

  // const handleClickNotiReceived = useCallback(
  //   (event: CustomEvent) => {
  //     console.log('😃 알림 클릭 이벤트 수신:', {
  //       platform,
  //       eventType: event.type,
  //       notification: event.detail?.notification
  //     });

  //     if (platform === 'Web') {
  //       console.log('[웹] 웹 환경에서는 알림 클릭 이벤트를 처리하지 않습니다.');
  //       return;
  //     }

  //     if (event.detail?.notification) {
  //       setNotification(event.detail.notification);
  //       safePostMessage({
  //         type: 'NOTIFICATION_CLICKED',
  //         notification: event.detail.notification,
  //         timestamp: 456456
  //       });
  //     } else {
  //       console.warn('[웹→앱] 알림 클릭 이벤트 수신 에러');
  //       safePostMessage({
  //         type: 'NOTIFICATION_CLICKED',
  //         error: '알림 클릭 이벤트 수신 에러',
  //         timestamp: new Date().toISOString()
  //       });
  //     }
  //   },
  //   [platform, safePostMessage]
  // );

  const handleWebViewMessage = useCallback(
    (event: MessageEvent) => {
      console.log('[웹→앱] 메시지 이벤트 발생:', {
        platform,
        eventType: event.type,
        data:
          typeof event.data === 'string'
            ? event.data
            : JSON.stringify(event.data)
      });

      if (platform === 'Web') {
        console.log('[웹] 웹 환경에서는 웹뷰 메시지를 처리하지 않습니다.');
        return;
      }

      try {
        let data: WebViewMessage;
        if (typeof event.data === 'string') {
          try {
            data = JSON.parse(event.data);
          } catch (e) {
            console.log('[웹→앱] 문자열 파싱 실패, 원본 데이터 사용');
            data = { type: event.data };
          }
        } else {
          data = event.data;
        }

        switch (data.type) {
          case 'NOTIFICATION_CLICKED':
            if (data.notification) {
              console.log('[웹→앱] 알림 클릭 성공:', data.notification);
              localStorage.setItem(
                'click_noti',
                JSON.stringify(data.notification)
              );
              setNotification(data.notification);
              safePostMessage({
                type: 'NOTIFICATION_CLICKED',
                notification: data.notification,
                timestamp: 777777
              });
            }
            break;
          case 'ready':
          case 'can-inline-scripts':
          case 'init-reply':
            console.log('[웹→앱] iOS 초기화 메시지:', {
              type: data.type,
              platform,
              message: data.message
            });
            break;
          default:
            console.log('[웹→앱] 미처리 메시지 타입:', {
              type: data.type,
              data: event.data
            });
        }
      } catch (e) {
        console.error('[웹→앱] 메시지 처리 중 에러:', {
          error: e,
          originalData: event.data
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

    // const clickNotiListener = handleClickNotiReceived as EventListener;
    // window.addEventListener('clickNotificationReceived', clickNotiListener);
    const webViewMessageListener = handleWebViewMessage as EventListener;
    window.addEventListener(
      'clickNotificationReceived',
      webViewMessageListener
    );

    return () => {
      // window.removeEventListener('message', webViewMessageListener);
      window.removeEventListener(
        'clickNotificationReceived',
        webViewMessageListener
      );
    };
  }, [platform, safePostMessage, handleWebViewMessage]);

  return { notification };
};
