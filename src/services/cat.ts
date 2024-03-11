import returnFetch from '@/utils/returnFetch';
import { base64ToFile } from '@/utils/common';
import { getCookie } from '@/utils/common';

const memberToken = getCookie('Authorization');

export const fetchExtended = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_MEOW_API,
  headers: { Authorization: `Bearer ${memberToken}` }
});

export const registerCat = async (reqObj: {
  name: string;
  sex: string;
  isNeutered: boolean;
  metAt: string;
  memo: string;
  profileImage: string | null;
}) => {
  const formData = new FormData();
  formData.append('nickname', reqObj.name);

  const file = base64ToFile(reqObj.profileImage, 'image.jpg');
  file && formData.append('profileImage', file);

  const requestOptions = { method: 'PATCH', body: formData };

  try {
    const response = await fetchExtended('/cats', requestOptions);

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('고양이 등록 중 오류 발생:' + error.message);
    } else {
      throw new Error('고양이 등록 중 오류 발생:');
    }
  }
};
