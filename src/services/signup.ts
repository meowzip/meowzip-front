import httpClient from '@/utils/fetcher';

type RequestInterceptor = (
  url: RequestInfo,
  config: RequestInit
) => RequestInit;

type ResponseInterceptor = (response: Response) => Promise<Response>;
const requestInterceptor: RequestInterceptor = (url, config) => {
  return config;
};
const responseInterceptor: ResponseInterceptor = async response => {
  return response;
};

export const apiClient = httpClient({
  baseUrl: 'http://13.125.131.2:8080/api/public/v1.0.0',
  interceptors: {
    request: requestInterceptor,
    response: responseInterceptor
  }
});

export const validateNicknameOnServer = async (nickname: string) => {
  try {
    const response = await apiClient(
      `/members/validate-nickname?nickname=${encodeURIComponent(nickname)}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('닉네임 유효성 검사 중 오류 발생:' + error.message);
    } else {
      throw new Error('닉네임 유효성 검사 중 오류 발생:');
    }
  }
};

export const signupOnServer = async (reqObj: {
  email: string;
  password: string;
}) => {
  try {
    const requestBody = JSON.stringify({ reqObj });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody
    };

    const response = await apiClient('/members/sign-up', requestOptions);
    const data = await response.json();

    return data;
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
    const requestBody = JSON.stringify({ reqObj });
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: requestBody
    };

    const response = await apiClient('/members/sign-up', requestOptions);
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('닉네임 유효성 검사 중 오류 발생:' + error.message);
    } else {
      throw new Error('닉네임 유효성 검사 중 오류 발생:');
    }
  }
};
