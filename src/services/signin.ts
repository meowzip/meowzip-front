import returnFetchJson from '@/utils/returnFetchJson';

const fetchExtended = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API,
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

    const isEmailExist = (response.body as any).isEmailExist;
    return isEmailExist;
  } catch (error) {
    console.error('Error:', error);
  }
};
