export type UserAgent = {
  isAndroid: boolean;
  isIOS: boolean;
};

export type WebViewMessage = {
  type: string;
  token?: string;
  message?: string;
  error?: string;
};

export const checkUserAgent = (): UserAgent => {
  if (typeof window === 'undefined') {
    return {
      isAndroid: false,
      isIOS: false
    };
  }

  const userAgent = window.navigator.userAgent.toLowerCase();
  const isAndroid = /android/i.test(userAgent);
  const isIOS = /iphone|ipad|ipod/i.test(userAgent);

  return {
    isAndroid,
    isIOS
  };
};
