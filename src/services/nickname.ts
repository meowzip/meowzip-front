import returnFetchJson from '@/utils/returnFetchJson';

const token =
  'eyJhbGciOiJIUzI1NiJ9.eyJtZW1iZXJJZCI6MjcsImlhdCI6MTcwNTEzMTA0OCwiZXhwIjoxNzA1MTM0NjQ4fQ.flP5mYbjxpBvK9mTjaWF8ct4bpSMkdXCCITK6I4sPfQ';

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

export const updateProfileOnServer = async (reqObj: {
  nickname: string;
  profileImage: string | null;
}) => {
  try {
    const requestOptions = {
      method: 'PATCH',
      body: reqObj
    };

    const response = await fetchExtendedAuth('/members', requestOptions);

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('프로필 수정 중 오류 발생:' + error.message);
    } else {
      throw new Error('프로필 수정 중 오류 발생:');
    }
  }
};
