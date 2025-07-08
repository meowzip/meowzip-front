import { useEffect, useState, useCallback } from 'react';
import { useWebView, WEBVIEW_MESSAGE_TYPES } from '@/hooks/useWebView';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usePathname } from 'next/navigation';
import {
  getPushNotification,
  togglePushNotificationOnServer
} from '@/services/push-notification';
import { toast } from '@/components/ui/hooks/useToast';
import { getCurrentDateInYYYYMMDD } from '@/utils/common';

export const usePushAlarmPermission = () => {
  const { platform, safePostMessage } = useWebView();
  const [permission, setPermission] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const pathName = usePathname();

  const {
    data: pushPermission,
    isSuccess,
    isError,
    error
  } = useQuery({
    queryKey: ['getPushNoti'],
    queryFn: () => getPushNotification(),
    staleTime: 0
  });

  if (isError) throw error;

  const togglePushNotification = useMutation({
    mutationFn: () => togglePushNotificationOnServer(),
    onSuccess: (data: any) => {
      if (data.status === 'OK') {
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === 'getPushNoti'
        });
        toast({
          description: `${getCurrentDateInYYYYMMDD()} 앱 푸시 수신 동의를 ${pushPermission.receivePushNotification ? '철회' : '동의'} 했어요`,
          duration: 2000
        });
      }
    }
  });

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

      // if (isSuccess && pushPermission) {
      //   const shouldBeEnabled: Boolean =
      //     event.detail?.enabled === 'granted' ? true : false;
      //   const currentEnabled: Boolean = pushPermission.receivePushNotification;
      //   console.log('🍋🍋 shouldBeEnabled: ', shouldBeEnabled);
      //   console.log('🍋🍋🍋 currentEnabled: ', currentEnabled);

      //   if (shouldBeEnabled !== currentEnabled) {
      //     togglePushNotification.mutate();
      //   }
      // }

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
  }, [platform, pathName, safePostMessage, requestPushPermissionReceived]);

  return { requestPushPermissionReceived, permission };
};
