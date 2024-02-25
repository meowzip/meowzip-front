import returnFetch from '@/utils/returnFetch';
import returnFetchJson from '@/utils/returnFetchJson';
import { getCookie } from '@/utils/common';

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

const base64ToFile = (base64String: string | null, filename: string) => {
  // Split the base64 string into parts
  if (!base64String) return;

  const parts = base64String.split(';base64,');
  const decodedData = window.atob(parts[1]); // Decode base64 string

  // Convert decoded data to binary
  const uint8Array = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; ++i) {
    uint8Array[i] = decodedData.charCodeAt(i);
  }

  // Create a Blob from the binary data
  const blob = new Blob([uint8Array]);

  // Create a File from the Blob
  const file = new File([blob], filename);

  return file;
};
