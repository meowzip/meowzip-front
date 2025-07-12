import { fetchPublicJson } from '@/utils/fetch';

export const checkMembershipByEmail = async (email: string) => {
  try {
    const response = await fetchPublicJson(
      `/members/email-exists?email=${encodeURIComponent(email)}`,
      { method: 'GET' }
    );
    const isSuccess = (response.body as any).status;
    if (isSuccess) {
      const data = (response.body as any).data;
      return data;
    } else {
      console.error('이메일로 가입 여부 확인 중 오류:');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

export const signInOnServer = async (reqObj: {
  email: string;
  password: string;
  fcmToken: string;
}) => {
  try {
    const response = await fetch('/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(reqObj),
      credentials: 'include'
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || '로그인 요청 중 오류 발생');
    }

    const data = await response.json();
    return {
      ok: true,
      body: data
    };
  } catch (error) {
    throw error;
  }
};

export const sendPwdResetEmail = async (reqObj: { email: string }) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj,
      headers: { 'Content-Type': 'application/json' }
    };

    const response = await fetchPublicJson(
      '/members/send-password-reset-email',
      requestOptions
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(
        '비밀번호 초기화 메일 전송 중 오류 발생:' + error.message
      );
    } else {
      throw new Error('비밀번호 초기화 메일 전송 중 오류 발생');
    }
  }
};
