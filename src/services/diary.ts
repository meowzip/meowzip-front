import { DiaryRegisterReqObj } from '@/app/diary/diaryType';
import { fetchExtendedForm, fetchExtendedAuth } from '@/services/nickname';
import { base64ToFile } from '@/utils/common';

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
    body: formData
  };

  try {
    const response = await fetchExtendedForm('/diaries', requestOptions);

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
  const response = await fetchExtendedAuth(
    `/diaries/monthly?year=${date.getFullYear()}&month=${date.getMonth() + 1}`
  );
  if (!response.ok) return [];

  if (typeof response.body !== 'object') {
    console.error('fetchExtendedAuth에서 예상치 못한 응답 형식입니다.');
    return [];
  }

  const data = (response.body as any).items || [];
  const filterCaredDiariesData = filterCaredDiaries(data);
  return filterCaredDiariesData;
};

const filterCaredDiaries = (diaries: any) => {
  return diaries.filter((diary: any) => diary.cared);
};

export const deleteDiaryOnServer = async (id: number) => {
  const requestOptions = {
    method: 'DELETE'
  };

  try {
    const response = await fetchExtendedForm(`/diaries/${id}`, requestOptions);

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
  formData.append(
    'diary',
    new Blob([JSON.stringify(diary)], {
      type: 'application/json'
    })
  );

  const imageUrl = images.filter(image => image.includes('http'));
  if (imageUrl) {
    imageUrl.forEach(file => {
      file && formData.append('images', file);
    });
  }
  const files = images?.map(image => base64ToFile(image, 'image.jpg'));
  if (files) {
    files.forEach(file => {
      file && formData.append('images', file);
    });
  }

  const requestOptions = {
    method: 'PATCH',
    body: formData
  };

  try {
    const response = await fetchExtendedForm(
      `/diaries/${reqObj.id}`,
      requestOptions
    );

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
