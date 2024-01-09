import returnFetchJson from '@/utils/returnFetchJson';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MjcsImlhdCI6MTcwNDgxMDQ1NCwiZXhwIjoxNzA0ODE0MDU0fQ.-eiPmP1YaKn9xNzpo5AauZeESDY8w1lstlXAgGLDuSI';

export const fetchExtendedAuth = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_MEOW_API,
  headers: { Accept: 'application/json', Authorization: token }
});

export const validateNicknameOnServer = async (nickname: string) => {
  try {
    const response = await fetchExtendedAuth(
      `/members/validate-nickname?nickname=${encodeURIComponent(nickname)}`
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
