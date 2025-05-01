interface Window {
  checkPushToken?: () => void;
  getPushToken?: () => string | null;
  pushToken?: string;
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
  vibrate(duration?: number): void;
  addVibrateToElement(elementId: string): void;
  pushNotiPermission?: string;
  clickNotification?: {
    url: string;
    'notification-id': number;
    type: string;
  };
}
