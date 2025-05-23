import { useEffect, useState } from 'react';
import { WebViewMessage } from '@/types/webview';
import { useWebView } from '@/hooks/useWebView';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { readNotificationOnServer } from '@/services/profile';
import { usePathname } from 'next/navigation';

export const useClickNoti = () => {
  const { platform, safePostMessage } = useWebView();
  const [notification, setNotification] = useState<WebViewMessage | null>(null);
  const queryClient = useQueryClient();
  const pathName = usePathname();

  const readNotification = useMutation({
    mutationFn: ({ id }: { id: number; type: string }) =>
      readNotificationOnServer(id),
    onSuccess: (data: any, variables: { id: number; type: string }) => {
      if (data.status === 'OK') {
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === 'getNotifications'
        });
      }
    }
  });

  const handleClickNotiReceived = (event: CustomEvent) => {
    console.log('😃 알림 클릭 이벤트 수신:', {
      platform,
      eventType: event.type,
      notification: event.detail?.notification
    });

    if (platform === 'Web') {
      console.log('[웹] 웹 환경에서는 알림 클릭 이벤트를 처리하지 않습니다.');
      return;
    }

    readNotification.mutate({
      id: Number(event.detail?.notification['notification-id']),
      type: event.detail?.notification.type
    });
    setNotification(event.detail?.notification);
    safePostMessage({
      type: 'NOTIFICATION_CLICKED',
      notification: event.detail.notification,
      timestamp: 121212
    });
  };

  const handleWebViewMessage = (event: MessageEvent) => {
    console.log('🌼 메시지 이벤트 발생:', {
      platform,
      eventType: event.type,
      data:
        typeof event.data === 'string' ? event.data : JSON.stringify(event.data)
    });
    console.log('🌼🌼 event', event);

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
          data = { type: event.data as any };
        }
      } else {
        data = event.data;
      }
      console.log('🌼🌼🌼 data', data);

      switch (data.type) {
        case 'NOTIFICATION_CLICKED':
          if (data.notification) {
            console.log('🌼🌼🌼🌼 알림 클릭 성공:', data.notification);
          }
          break;

        default:
          console.log('🌼🌼🌼🌼🌼 미처리 메시지 타입:', {
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
  };

  useEffect(() => {
    if (platform === 'Web') {
      console.log('[웹] 웹 환경에서는 이벤트 리스너를 등록하지 않습니다.');
      return;
    }

    const clickNotiListener = handleClickNotiReceived as EventListener;
    const webViewMessageListener = handleWebViewMessage;
    window.addEventListener('clickNotificationReceived', clickNotiListener);
    window.addEventListener('message', webViewMessageListener);

    if (window.ReactNativeWebView?.postMessage) {
      safePostMessage({
        type: 'BRIDGE_READY',
        timestamp: 343434
      });
    }

    return () => {
      console.log('[웹→앱] 이벤트 리스너 제거');
      window.removeEventListener(
        'clickNotificationReceived',
        clickNotiListener
      );
      window.removeEventListener('message', webViewMessageListener);
    };
  }, [handleClickNotiReceived, pathName]);

  return { handleClickNotiReceived, notification };
};
