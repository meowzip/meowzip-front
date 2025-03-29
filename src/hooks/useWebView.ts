import { useEffect, useCallback, useMemo } from 'react';
import { checkUserAgent, type WebViewMessage } from '@/utils/userAgent';

interface UseWebViewReturn {
  isAndroid: boolean;
  isIOS: boolean;
  platform: 'Android' | 'iOS' | 'Web';
}

export const useWebView = (): UseWebViewReturn => {
  const { isAndroid, isIOS } = useMemo(() => checkUserAgent(), []);

  const getPlatform = useCallback(() => {
    if (isAndroid) return 'Android';
    if (isIOS) return 'iOS';
    return 'Web';
  }, [isAndroid, isIOS]);

  const platform = useMemo(() => getPlatform(), [getPlatform]);

  const handlePushTokenReceived = useCallback(
    (event: CustomEvent) => {
      if (platform === 'Web') return;

      console.log('[웹뷰] 푸시 토큰 이벤트 수신:', event.detail.token);
      localStorage.setItem('fcm_token', event.detail.token);
    },
    [platform]
  );

  const handleWebViewMessage = useCallback(
    (event: MessageEvent) => {
      if (platform === 'Web') return;

      try {
        const data: WebViewMessage =
          typeof event.data === 'string' ? JSON.parse(event.data) : event.data;

        console.log('[웹뷰] 메시지 수신:', {
          type: data.type,
          platform
        });

        switch (data.type) {
          case 'PUSH_TOKEN_RECEIVED':
            if (data.token) {
              localStorage.setItem('fcm_token', data.token);
            }
            break;
          case 'TOKEN_SET_SUCCESS':
            console.log('[웹뷰] 토큰 설정 성공');
            break;
          case 'TOKEN_SET_ERROR':
            console.error('[웹뷰] 토큰 설정 실패:', data.error);
            break;
          case 'WEB_PAGE_LOADED':
            console.log('[웹뷰] 페이지 로드 완료');
            break;
        }
      } catch (e) {
        console.error('❌ 메시지 파싱 실패:', e);
      }
    },
    [platform]
  );

  useEffect(() => {
    if (platform === 'Web') return;

    const pushTokenListener = handlePushTokenReceived as EventListener;
    const webViewMessageListener = handleWebViewMessage;

    window.addEventListener('pushTokenReceived', pushTokenListener);
    window.addEventListener('message', webViewMessageListener);

    window.dispatchEvent(new CustomEvent('load'));

    return () => {
      window.removeEventListener('pushTokenReceived', pushTokenListener);
      window.removeEventListener('message', webViewMessageListener);
    };
  }, [platform, handlePushTokenReceived, handleWebViewMessage]);

  return {
    isAndroid,
    isIOS,
    platform
  };
};
