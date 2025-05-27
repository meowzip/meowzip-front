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

    const isSuccess = (response.body as any).status;
    if (isSuccess) {
      const data = (response.body as any).data;
      return data;
    } else {
      throw new Error('푸시 알람 여부 조회 중 오류 발생:');
    }
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
