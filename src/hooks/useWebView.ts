import { useEffect, useCallback, useMemo } from 'react';
import { checkUserAgent, type WebViewMessage } from '@/utils/userAgent';

interface UseWebViewReturn {
  isAndroid: boolean;
  isIOS: boolean;
  platform: 'Android' | 'iOS' | 'Web';
  safePostMessage: (message: { type: string; [key: string]: any }) => void;
}

declare global {
  interface Window {
    ReactNativeWebView?: {
      postMessage: (message: string) => void;
    };
  }
}

const WEBVIEW_MESSAGE_TYPES = {
  CONSOLE_LOG: 'CONSOLE_LOG',
  CONSOLE_ERROR: 'CONSOLE_ERROR',
  CONSOLE_WARN: 'CONSOLE_WARN',
  PUSH_TOKEN_RECEIVED: 'PUSH_TOKEN_RECEIVED',
  TOKEN_SET_SUCCESS: 'TOKEN_SET_SUCCESS',
  TOKEN_SET_ERROR: 'TOKEN_SET_ERROR',
  WEB_PAGE_LOADED: 'WEB_PAGE_LOADED',
  BRIDGE_READY: 'BRIDGE_READY',
  NOTIFICATION_PERMISSION: 'NOTIFICATION_PERMISSION',
  NOTIFICATION_CLICKED: 'NOTIFICATION_CLICKED'
} as const;

export const useWebView = (): UseWebViewReturn => {
  const { isAndroid, isIOS } = useMemo(() => checkUserAgent(), []);

  const getPlatform = useCallback(() => {
    if (isAndroid) return 'Android';
    if (isIOS) return 'iOS';
    return 'Web';
  }, [isAndroid, isIOS]);

  const platform = useMemo(() => getPlatform(), [getPlatform]);

  const safePostMessage = useCallback(
    (message: { type: string; [key: string]: any }) => {
      if (!message || typeof message !== 'object') {
        console.error('[웹→앱] 잘못된 메시지 형식:', message);
        return;
      }

      if (!message.type) {
        console.error('[웹→앱] 메시지 타입 누락:', message);
        return;
      }

      try {
        const serializedMessage = JSON.stringify(message);
        if (window.ReactNativeWebView?.postMessage) {
          window.ReactNativeWebView.postMessage(serializedMessage);
        } else {
          console.warn(
            '[웹→앱] ReactNativeWebView 브릿지가 준비되지 않았습니다.'
          );
        }
      } catch (error) {
        console.error('[웹→앱] 메시지 전송 실패:', error);
      }
    },
    []
  );

  const handlePushTokenReceived = useCallback(
    (event: CustomEvent) => {
      console.log('[웹→앱] 푸시 토큰 이벤트 수신:', {
        platform,
        eventType: event.type,
        token: event.detail?.token
      });

      if (platform === 'Web') {
        console.log('[웹] 웹 환경에서는 푸시 토큰 이벤트를 처리하지 않습니다.');
        return;
      }

      if (event.detail?.token) {
        console.log('[웹→앱] FCM 토큰 저장 시도:', event.detail.token);
        localStorage.setItem('fcm_token', event.detail.token);
        console.log('[웹→앱] FCM 토큰 저장 완료');

        safePostMessage({
          type: WEBVIEW_MESSAGE_TYPES.TOKEN_SET_SUCCESS,
          token: event.detail.token,
          timestamp: new Date().toISOString()
        });
      } else {
        console.warn('[웹→앱] 토큰이 없는 이벤트 수신됨');
        safePostMessage({
          type: WEBVIEW_MESSAGE_TYPES.TOKEN_SET_ERROR,
          error: '토큰이 없습니다.',
          timestamp: new Date().toISOString()
        });
      }
    },
    [platform, safePostMessage]
  );

  const requestNotiPermission = useCallback(
    (event: CustomEvent) => {
      console.log('푸시 알림 여부 이벤트 수신:', {
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

      if (event.detail?.enabled) {
        console.log('[웹→앱] 푸시 알림 여부 저장 시도:', event.detail.enabled);
        localStorage.setItem('push_permission', event.detail.enabled);
        console.log('[웹→앱] 푸시 알림 여부 저장 완료');

        safePostMessage({
          type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_PERMISSION,
          enabled: event.detail.enabled,
          timestamp: new Date().toISOString()
        });
      } else {
        console.warn('[웹→앱] 푸시 알림 여부 이벤트 수신 에러');
        safePostMessage({
          type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_PERMISSION,
          error: '푸시 알림 여부 이벤트 수신 에러',
          timestamp: new Date().toISOString()
        });
      }

      safePostMessage({
        type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_PERMISSION,
        enabled: event.detail?.enabled,
        timestamp: new Date().toISOString()
      });
    },
    [platform, safePostMessage]
  );

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
        console.log('[웹→앱] 알림 클릭 저장 시도:', event.detail?.notification);
        localStorage.setItem('click_noti', event.detail?.notification);
        console.log('[웹→앱] 알림 클릭 저장 완료');

        safePostMessage({
          type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_CLICKED,
          notification: event.detail.notification,
          timestamp: new Date().toISOString()
        });
      } else {
        console.warn('[웹→앱] 알림 클릭 이벤트 수신 에러');
        safePostMessage({
          type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_CLICKED,
          error: '알림 클릭 이벤트 수신 에러',
          timestamp: new Date().toISOString()
        });
      }

      safePostMessage({
        type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_CLICKED,
        notification: event.detail.notification,
        timestamp: new Date().toISOString()
      });
    },
    [platform, safePostMessage]
  );

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

        console.log('[웹→앱] 처리할 메시지:', {
          type: data.type,
          platform,
          token: data.token,
          message: data.message,
          error: data.error,
          enabled: data.enabled,
          notification: data.notification
        });

        switch (data.type) {
          case WEBVIEW_MESSAGE_TYPES.PUSH_TOKEN_RECEIVED:
            if (data.token) {
              console.log('[웹→앱] FCM 토큰 저장 시도 (메시지):', data.token);
              localStorage.setItem('fcm_token', data.token);
              console.log('[웹→앱] FCM 토큰 저장 완료 (메시지)');

              safePostMessage({
                type: WEBVIEW_MESSAGE_TYPES.TOKEN_SET_SUCCESS,
                token: data.token,
                timestamp: new Date().toISOString()
              });
            }
            break;
          case WEBVIEW_MESSAGE_TYPES.TOKEN_SET_SUCCESS:
            console.log('[웹→앱] 토큰 설정 성공:', data.token);
            break;
          case WEBVIEW_MESSAGE_TYPES.TOKEN_SET_ERROR:
            console.error('[웹→앱] 토큰 설정 실패:', data.error);
            break;
          case WEBVIEW_MESSAGE_TYPES.WEB_PAGE_LOADED:
            console.log('[웹→앱] 페이지 로드 완료');
            safePostMessage({
              type: WEBVIEW_MESSAGE_TYPES.WEB_PAGE_LOADED,
              timestamp: new Date().toISOString()
            });
            break;
          case WEBVIEW_MESSAGE_TYPES.NOTIFICATION_PERMISSION:
            if (data.enabled) {
              console.log('[웹→앱] 푸시 알림 여부 수신:', data.enabled);
              localStorage.setItem('push_permission', data.enabled);
              safePostMessage({
                type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_PERMISSION,
                enabled: data.enabled,
                timestamp: new Date().toISOString()
              });
            }
            break;
          case WEBVIEW_MESSAGE_TYPES.NOTIFICATION_CLICKED:
            if (data.notification) {
              console.log('[웹→앱] 알림 클릭 성공:', data.notification);
              localStorage.setItem(
                'click_noti',
                JSON.stringify(data.notification)
              );
              safePostMessage({
                type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_CLICKED,
                notification: data.notification,
                timestamp: new Date().toISOString()
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
    console.log('[웹→앱] useEffect 실행:', {
      platform,
      isWebView: platform !== 'Web',
      windowExists: typeof window !== 'undefined',
      hasReactNativeWebView: !!window?.ReactNativeWebView
    });

    if (platform === 'Web') {
      console.log('[웹] 웹 환경에서는 이벤트 리스너를 등록하지 않습니다.');
      return;
    }

    console.log('[웹→앱] 이벤트 리스너 등록 시작');

    const pushTokenListener = handlePushTokenReceived as EventListener;
    const pushPermissionListener = requestNotiPermission as EventListener;
    const handleClickNotiReceivedListener =
      handleClickNotiReceived as EventListener;
    const webViewMessageListener = handleWebViewMessage;

    window.addEventListener('pushTokenReceived', pushTokenListener);
    window.addEventListener('pushPermissionReceived', pushPermissionListener);
    window.addEventListener(
      'clickNotificationReceived',
      handleClickNotiReceivedListener
    );
    window.addEventListener('message', webViewMessageListener);

    console.log('[웹→앱] 이벤트 리스너 등록 완료');

    if (window.ReactNativeWebView?.postMessage) {
      safePostMessage({
        type: WEBVIEW_MESSAGE_TYPES.BRIDGE_READY,
        timestamp: new Date().toISOString()
      });
    }

    const currentToken = localStorage.getItem('fcm_token');
    if (currentToken) {
      console.log('[웹→앱] 저장된 FCM 토큰:', currentToken);
      safePostMessage({
        type: WEBVIEW_MESSAGE_TYPES.PUSH_TOKEN_RECEIVED,
        token: currentToken,
        timestamp: new Date().toISOString()
      });
    }

    const currentPushPermission = localStorage.getItem('push_permission');
    if (currentPushPermission) {
      console.log('[웹→앱] 저장된 푸시 알림 여부:', currentPushPermission);
      safePostMessage({
        type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_PERMISSION,
        enabled: currentPushPermission,
        timestamp: new Date().toISOString()
      });
    }

    const currentClickedNoti = localStorage.getItem('click_noti');
    if (currentClickedNoti) {
      console.log('[웹→앱] 저장된 알림 클릭:', currentClickedNoti);
      safePostMessage({
        type: WEBVIEW_MESSAGE_TYPES.NOTIFICATION_CLICKED,
        notification: currentClickedNoti,
        timestamp: new Date().toISOString()
      });
    }

    return () => {
      console.log('[웹→앱] 이벤트 리스너 제거');
      window.removeEventListener('pushTokenReceived', pushTokenListener);
      window.removeEventListener(
        'pushPermissionReceived',
        pushPermissionListener
      );
      window.removeEventListener(
        'clickNotificationReceived',
        handleClickNotiReceivedListener
      );
      window.removeEventListener('message', webViewMessageListener);
    };
  }, [
    platform,
    handlePushTokenReceived,
    handleWebViewMessage,
    safePostMessage,
    requestNotiPermission
  ]);

  return {
    isAndroid,
    isIOS,
    platform,
    safePostMessage
  };
};
