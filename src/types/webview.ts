export const WebViewMessageType = {
  PUSH_TOKEN: 'PUSH_TOKEN',
  NOTIFICATION_CLICKED: 'NOTIFICATION_CLICKED',
  NOTIFICATION_PERMISSION: 'NOTIFICATION_PERMISSION'
} as const;

export interface WebViewMessage {
  type: (typeof WebViewMessageType)[keyof typeof WebViewMessageType];
  token?: string;
  notification?: any;
  enabled?: string;
}
