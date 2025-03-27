export const WebViewMessageType = {
  PUSH_TOKEN: 'PUSH_TOKEN',
  NOTIFICATION_CLICKED: 'NOTIFICATION_CLICKED'
} as const;

export interface WebViewMessage {
  type: (typeof WebViewMessageType)[keyof typeof WebViewMessageType];
  token?: string;
  notification?: any;
}
