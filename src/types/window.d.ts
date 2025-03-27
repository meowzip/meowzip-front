interface Window {
  checkPushToken?: () => void;
  getPushToken?: () => string | null;
  pushToken?: string;
  ReactNativeWebView?: {
    postMessage: (message: string) => void;
  };
}
