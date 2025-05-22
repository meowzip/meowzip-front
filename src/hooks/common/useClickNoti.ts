import { useCallback, useEffect, useState } from 'react';
import { WebViewMessage, WebViewMessageType } from '@/types/webview';
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

    // if (event.detail?.notification) {
    //   console.log('[웹→앱] 알림 클릭 저장 시도:', event.detail?.notification);
    //   localStorage.setItem(
    //     'click_noti',
    //     JSON.stringify(event.detail?.notification)
    //   );
    //   setNotification(event.detail?.notification);

    //   safePostMessage({
    //     type: 'NOTIFICATION_CLICKED',
    //     notification: event.detail.notification,
    //     timestamp: 111111
    //   });
    //   console.log('111111', notification);
    // } else {
    //   console.warn('[웹→앱] 알림 클릭 이벤트 수신 에러');
    //   safePostMessage({
    //     type: 'NOTIFICATION_CLICKED',
    //     error: '알림 클릭 이벤트 수신 에러',
    //     timestamp: new Date().toISOString()
    //   });
    // }

    // safePostMessage({
    //   type: 'NOTIFICATION_CLICKED',
    //   notification: event.detail.notification,
    //   timestamp: 222222
    // });
    // console.log('222222', notification);
  };

  useEffect(() => {
    if (platform === 'Web') {
      console.log('[웹] 웹 환경에서는 이벤트 리스너를 등록하지 않습니다.');
      return;
    }

    const clickNotiListener = handleClickNotiReceived as EventListener;
    window.addEventListener('clickNotificationReceived', clickNotiListener);

    return () => {
      console.log('[웹→앱] 이벤트 리스너 제거');
      window.removeEventListener(
        'clickNotificationReceived',
        clickNotiListener
      );
    };
  }, [handleClickNotiReceived, platform, pathName]);

  return { handleClickNotiReceived, notification };
};
