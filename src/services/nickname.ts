import { getAuthHeader } from '@/utils/common';
import { base64ToFile } from '@/utils/common';
import { fetchAuth, fetchAuthJson } from '@/utils/fetch';

export const validateNicknameOnServer = async (nickname: string) => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { Accept: 'application/json', ...getAuthHeader() }
    };
    const response = await fetchAuthJson(
      `/members/validate-nickname?nickname=${encodeURIComponent(nickname)}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

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
  nickname?: string;
  profileImage?: string | null;
}) => {
  const formData = new FormData();

  if (reqObj.nickname) {
    formData.append('nickname', reqObj.nickname);
  }

  if (reqObj.profileImage) {
    if (reqObj.profileImage.startsWith('data:')) {
      const file = base64ToFile(reqObj.profileImage, 'image.jpg');
      file && formData.append('profileImage', file);
    }
  }

  const requestOptions = {
    method: 'PATCH',
    headers: { Accept: 'application/json', ...getAuthHeader() },
    body: formData
  };

  try {
    const response = await fetchAuth('/members', requestOptions);
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('프로필 수정 중 오류 발생:' + error.message);
    } else {
      throw new Error('프로필 수정 중 오류 발생:');
    }
  }
};
