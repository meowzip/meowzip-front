import { getAuthHeader } from '@/utils/common';
import { fetchAuthJson } from '@/utils/fetch';

export const getPushNotification = async () => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { Accept: 'application/json', ...getAuthHeader() }
    };
    const response = await fetchAuthJson(
      '/members/notifications',
      requestOptions
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = (response.body as any).data;
    return data;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('푸시 알람 여부 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('푸시 알람 여부 조회 중 오류 발생:');
    }
  }
};

export const togglePushNotificationOnServer = async () => {
  try {
    const requestOptions = {
      method: 'PATCH',
      headers: { Accept: 'application/json', ...getAuthHeader() }
    };
    const response = await fetchAuthJson(
      '/members/notifications',
      requestOptions
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('푸시 알림 on/off 처리 중 오류 발생:' + error.message);
    } else {
      throw new Error('푸시 알림 on/off 처리 중 오류 발생:');
    }
  }
};
