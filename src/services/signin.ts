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

export const checkMembershipByEmail = async (email: string) => {
  try {
    const response = await apiClient(
      `/members/email-exists?email=${encodeURIComponent(email)}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error(
        'An error occurred while checking membership by email: ' + error.message
      );
    } else {
      throw new Error(
        'An unknown error occurred while checking membership by email'
      );
    }
  }
};
