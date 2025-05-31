import { DiaryRegisterReqObj } from '@/app/diary/diaryType';
import {
  base64ToFile,
  getAuthHeader,
  objectToQueryString
} from '@/utils/common';
import { fetchAuth, fetchAuthJson } from '@/utils/fetch';

type DiarySearchOption = {
  page: number;
  size: number;
  date: string;
  'cat-id'?: number;
};

interface DiaryObj extends DiaryRegisterReqObj {
  id: number;
}

export const getDiaries = async (reqObj: DiarySearchOption) => {
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(
      `/diaries?${objectToQueryString(reqObj)}`,
      requestOptions
    );

    const responseBody = await response.text();
    const parsedBody = JSON.parse(responseBody);

    if (parsedBody && Array.isArray(parsedBody.items)) {
      const sortByLatest = parsedBody.items.sort(
        (a: DiaryObj, b: DiaryObj) => b.id - a.id
      );
      parsedBody.items = sortByLatest;
      return parsedBody;
    } else {
      throw new Error('응답 본문이 없습니다.');
    }
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('일지 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('일지 조회 중 오류 발생:');
    }
  }
};

export const getDiaryDetail = async (id: number) => {
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuthJson(`/diaries/${id}`, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = (response.body as any).data;
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('일지 상세 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('일지 상세 조회 중 오류 발생:');
    }
  }
};

export const registerDiaryOnServer = async (reqObj: DiaryRegisterReqObj) => {
  const { images, ...diary } = reqObj;
  const formData = new FormData();
  formData.append(
    'diary',
    new Blob([JSON.stringify(diary)], {
      type: 'application/json'
    })
  );

  const files = images?.map(image => base64ToFile(image, 'image.jpg'));
  if (files) {
    files.forEach(file => {
      file && formData.append('images', file);
    });
  }

  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() },
    body: formData
  };

  try {
    const response = await fetchAuth('/diaries', requestOptions);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('일지 등록 중 오류 발생:' + error.message);
    } else {
      throw new Error('일지 등록 중 오류 발생:');
    }
  }
};

export const getDiariesByMonth = async (date: Date) => {
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuthJson(
      `/diaries/monthly?year=${date.getFullYear()}&month=${date.getMonth() + 1}`,
      requestOptions
    );
    if (!response.ok) return [];
    if (typeof response.body !== 'object') {
      console.error('fetchAuthJson에서 예상치 못한 응답 형식입니다.');
      return [];
    }

    const data = (response.body as any).items || [];
    const filterCaredDiariesData = filterCaredDiaries(data);
    return filterCaredDiariesData;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('일지 월별 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('일지 월별 조회 중 오류 발생:');
    }
  }
};

const filterCaredDiaries = (diaries: any) => {
  return diaries.filter((diary: any) => diary.cared);
};

export const deleteDiaryOnServer = async (id: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(`/diaries/${id}`, requestOptions);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('일지 삭제 중 오류 발생:' + error.message);
    } else {
      throw new Error('일지 삭제 중 오류 발생:');
    }
  }
};

export const editDiaryOnServer = async (reqObj: {
  id: number;
  diary: DiaryRegisterReqObj;
}) => {
  const { images, ...diary } = reqObj.diary;
  const formData = new FormData();

  const imageUrls = images.filter(image => image.includes('http'));
  formData.append(
    'diary',
    new Blob([JSON.stringify({ imageUrls: imageUrls, ...diary })], {
      type: 'application/json'
    })
  );
  const files = images?.map(image => base64ToFile(image, 'image.jpg'));
  if (files) {
    files.forEach(file => {
      file && formData.append('images', file);
    });
  }

  const requestOptions = {
    method: 'PATCH',
    headers: { Accept: 'application/json', ...getAuthHeader() },
    body: formData
  };

  try {
    const response = await fetchAuth(`/diaries/${reqObj.id}`, requestOptions);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('일지 등록 중 오류 발생:' + error.message);
    } else {
      throw new Error('일지 등록 중 오류 발생:');
    }
  }
};
