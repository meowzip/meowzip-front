import returnFetch from '@/utils/returnFetch';
import { base64ToFile } from '@/utils/common';
import { getCookie } from '@/utils/common';
import { objectToQueryString } from '@/utils/common';
import { fetchExtendedAuth } from '@/services/nickname';

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

type CatSearchOption = {
  page: number;
  size: number;
};

export const getCatsOnServer = async ({ page, size }: CatSearchOption) => {
  try {
    const response = await fetchExtended(
      `/cats?${objectToQueryString({ page, size })}`
    );
    if (response.body) {
      const responseBody = await response.text();
      const parsedBody = JSON.parse(responseBody);
      return parsedBody.items;
    } else {
      throw new Error('응답 본문이 없습니다.');
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('고양이 목록 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('고양이 목록 조회 중 오류 발생:');
    }
  }
};

export const requestCoParenting = async (reqObj: {
  catId: number;
  memberId: number;
}) => {
  const requestOptions = {
    method: 'POST',
    body: reqObj
  };

  try {
    const response = await fetchExtendedAuth(
      '/cats/co-parents/request',
      requestOptions
    );

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('일지 등록 중 오류 발생:' + error.message);
    } else {
      throw new Error('일지 등록 중 오류 발생:');
    }
  }
};
