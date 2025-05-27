import { getAuthHeader, removeCookie } from '@/utils/common';
import { fetchAuthJson, fetchPublicJson } from '@/utils/fetch';

export const signUpOnServer = async (reqObj: {
  email: string;
  password: string;
  loginType: string;
  fcmToken: string;
}) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj
    };

    const response = await fetchPublicJson('/members/sign-up', requestOptions);

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('닉네임 유효성 검사 중 오류 발생:' + error.message);
    } else {
      throw new Error('닉네임 유효성 검사 중 오류 발생:');
    }
  }
};

export const resetPwdOnServer = async (reqObj: {
  password: string;
  token: string;
}) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj,
      headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetchPublicJson(
      '/members/reset-password',
      requestOptions
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('닉네임 유효성 검사 중 오류 발생:' + error.message);
    } else {
      throw new Error('닉네임 유효성 검사 중 오류 발생:');
    }
  }
};

export const deleteAccountOnServer = async () => {
  try {
    const requestOptions = {
      method: 'PATCH',
      headers: { Accept: 'application/json', ...getAuthHeader() }
    };
    const response = await fetchAuthJson('/members/withdraw', requestOptions);
    if (response.status === 200) {
      removeCookie('Authorization');
      location.replace('/signin');
    }

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('회원 탈퇴 중 오류 발생:' + error.message);
    } else {
      throw new Error('회원 탈퇴 중 오류 발생:');
    }
  }
};
