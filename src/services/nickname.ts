import returnFetch from '@/utils/returnFetch';
import returnFetchJson from '@/utils/returnFetchJson';
import { getCookie } from '@/utils/common';
import { base64ToFile } from '@/utils/common';

const memberToken = getCookie('Authorization');

export const fetchExtendedAuth = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_MEOW_API,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${memberToken}`
  }
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

export const fetchExtendedForm = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_MEOW_API,
  headers: { Authorization: `Bearer ${memberToken}` }
});

export const updateProfileOnServer = async (reqObj: {
  nickname: string;
  profileImage: string | null;
}) => {
  const formData = new FormData();
  formData.append('nickname', reqObj.nickname);

  const file = base64ToFile(reqObj.profileImage, 'image.jpg');
  file && formData.append('profileImage', file);

  const requestOptions = { method: 'PATCH', body: formData };

  try {
    const response = await fetchExtendedForm('/members', requestOptions);

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
