import returnFetchJson from '@/utils/returnFetchJson';

const fetchExtended = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API,
  headers: { Accept: 'application/json', credentials: 'include' }
  // interceptors: {
  //   request: async args => {
  //     console.log('********* before sending request *********');
  //     console.log('url:', args[0].toString());
  //     console.log('requestInit:', args[1], '\n\n');
  //     return args;
  //   },
  //   response: async (response, requestArgs) => {
  //     console.log('********* after receiving response *********');
  //     console.log('url:', requestArgs[0].toString());
  //     console.log('requestInit:', requestArgs[1], '\n\n');
  //     return response;
  //   }
  // }
});

const fetchExtendedOauth = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_GOOGLE_OAUTH_API,
  headers: { Accept: 'application/json' }
  // interceptors: {
  //   request: async args => {
  //     console.log('********* before sending request *********');
  //     console.log('url:', args[0].toString());
  //     console.log('requestInit:', args[1], '\n\n');
  //     return args;
  //   },
  //   response: async (response, requestArgs) => {
  //     console.log('********* after receiving response *********');
  //     console.log('url:', requestArgs[0].toString());
  //     console.log('requestInit:', requestArgs[1], '\n\n');
  //     return response;
  //   }
  // }
});

export const checkMembershipByEmail = async (email: string) => {
  try {
    const response = await fetchExtended(
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
}) => {
  try {
    const requestOptions = {
      method: 'POST',
      body: reqObj
    };
    const response = await fetchExtended('/members/login', requestOptions);
    const token = response.headers.get('Authorization');

    if (token) {
      document.cookie = `Authorization=${token}; path=/; max-age=3600; secure;`;
    } else {
      throw new Error('Authorization token not found in the response');
    }
    console.log(response, 'signInOnServer');
    return response;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('로그인 요청 중 오류 발생:' + error.message);
    } else {
      throw new Error('로그인 요청 중 오류 발생');
    }
  }
};

// export const googleSignInOnServer = async () => {
//   try {
//     const requestOptions = {
//       method: 'POST'
//     };
//     const response = await fetchExtendedOauth('/google', requestOptions);
//   } catch (error) {
//     console.error(error);
//   }
// };
