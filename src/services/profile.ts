import { fetchExtendedAuth } from '@/services/signup';
import { getCookie } from '@/utils/common';

export const getMyProfile = async () => {
  try {
    const memberToken = getCookie('Authorization');
    const requestOptions = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${memberToken}`
      }
    };
    const response = await fetchExtendedAuth(
      '/profiles/my-profile',
      requestOptions
    );

    const isSuccess = (response.body as any).status;
    if (isSuccess) {
      const data = (response.body as any).data;
      return data;
    } else {
      throw new Error('내 프로필 조회 중 오류 발생:');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('내 프로필 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('내 프로필 조회 중 오류 발생:');
    }
  }
};
