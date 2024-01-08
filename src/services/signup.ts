import returnFetchJson from '@/utils/returnFetchJson';

export const fetchExtendedPublic = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API,
  headers: { Accept: 'application/json' }
});

export const signUpOnServer = async (reqObj: {
  email: string;
  password: string;
}) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj
    };

    const response = await fetchExtendedPublic(
      '/members/sign-up',
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

    const response = await fetchExtendedPublic(
      '/members/reset-password',
      requestOptions
    );
    console.log(response.body, 'resetPwdOnServer');

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
