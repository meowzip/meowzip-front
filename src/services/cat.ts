import { DiaryObj } from '@/app/diary/diaryType';
import { base64ToFile, getAuthHeader } from '@/utils/common';
import { objectToQueryString } from '@/utils/common';
import { CatObjType, CoParent } from '@/types/cat';
import { fetchAuth, fetchAuthJson } from '@/utils/fetch';

export const registerCat = async (
  catDataObj: CatObjType & {
    id?: number;
    diaries?: DiaryObj[];
    coParents?: CoParent[];
    dDay?: number;
    name?: string;
  }
) => {
  const { croppedImage, image, imageUrl, name, ...catObj } = catDataObj;
  const formData = new FormData();

  // imageUrl이 유효한 URL인 경우에만 포함 (빈 문자열이나 "string" 값이면 제외)
  if (imageUrl && imageUrl !== 'string' && imageUrl.trim() !== '') {
    const catJson = JSON.stringify({ ...catObj, name, imageUrl });

    formData.append(
      'cat',
      new Blob([catJson], {
        type: 'application/json'
      })
    );
    return fetchAuth('/cats', {
      method: 'POST',
      headers: { Accept: 'application/json', ...getAuthHeader() },
      body: formData
    });
  }

  // 사용자 업로드 이미지인 경우
  const catJson = JSON.stringify({ ...catObj, name });

  formData.append(
    'cat',
    new Blob([catJson], {
      type: 'application/json'
    })
  );

  // 크롭된 이미지가 있으면 크롭된 이미지를, 없으면 원본 이미지를 사용
  const imageToUpload = croppedImage || image;
  if (imageToUpload) {
    try {
      const file = base64ToFile(imageToUpload, 'image.jpg');
      if (file) {
        formData.append('image', file);
      }
    } catch (error) {
      console.error('이미지 변환 중 오류 발생:', error);
    }
  }

  return fetchAuth('/cats', {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() },
    body: formData
  });
};

export const editCat = async (
  catDataObj: CatObjType & {
    id?: number;
    diaries?: DiaryObj[];
    coParents?: CoParent[];
    dDay?: number;
  }
) => {
  const {
    imageUrl,
    coParents,
    diaries,
    dDay,
    id,
    image,
    croppedImage,
    ...catObj
  } = catDataObj;

  const formData = new FormData();
  const catBlob = new Blob([JSON.stringify(catObj)], {
    type: 'application/json'
  });
  formData.append('cat', catBlob);

  // 크롭된 이미지가 있으면 크롭된 이미지를, 없으면 원본 이미지를 사용
  const imageToUpload = croppedImage || image;
  if (imageToUpload) {
    const file = base64ToFile(imageToUpload, 'image.jpg');
    if (file) formData.append('image', file);
  }

  const requestOptions = {
    method: 'PATCH',
    headers: { Accept: 'application/json', ...getAuthHeader() },
    body: formData
  };

  try {
    const response = await fetchAuth(`/cats/${id}`, requestOptions);
    return response;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('고양이 수정 중 오류 발생:' + error.message);
    } else {
      throw new Error('고양이 수정 중 오류 발생:');
    }
  }
};

type CatSearchOption = {
  page: number;
  size: number;
  memberId?: number;
};

export const getCatsOnServer = async ({
  page,
  size,
  memberId
}: CatSearchOption) => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { Accept: 'application/json', ...getAuthHeader() }
    };
    const response = await fetchAuth(
      `/cats?${objectToQueryString({ page, size, 'member-id': memberId ?? '' })}`,
      requestOptions
    );
    if (response.body) {
      const responseBody = await response.text();
      const parsedBody = JSON.parse(responseBody);
      return parsedBody;
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

export const getCatDetail = async (id: number) => {
  try {
    const requestOptions = {
      method: 'GET',
      headers: { Accept: 'application/json', ...getAuthHeader() }
    };

    const response = await fetchAuthJson(`/cats/${id}`, requestOptions);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = (response.body as any).data;
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('고양이 상세 정보 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('고양이 상세 정보 조회 중 오류 발생:');
    }
  }
};

export const requestCoParenting = async (reqObj: {
  catId: number;
  memberId: number;
}) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() },
    body: reqObj
  };

  try {
    const response = await fetchAuthJson(
      '/cats/co-parents/request',
      requestOptions
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('고양이 공동냥육 신청 중 오류 발생:' + error.message);
    } else {
      throw new Error('고양이 공동냥육 신청 중 오류 발생:');
    }
  }
};

export const acceptCoParenting = async (coParentId: number) => {
  try {
    const response = await fetchAuthJson(
      `/cats/co-parents/${coParentId}/accept`,
      {
        method: 'POST',
        headers: { Accept: 'application/json', ...getAuthHeader() }
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('공동냥육 신청 수락 중 오류 발생:' + error.message);
    } else {
      throw new Error('공동냥육 신청 수락 중 오류 발생:');
    }
  }
};

export const rejectCoParenting = async (coParentId: number) => {
  try {
    const response = await fetchAuthJson(
      `/cats/co-parents/${coParentId}/reject`,
      {
        method: 'POST',
        headers: { Accept: 'application/json', ...getAuthHeader() }
      }
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('공동냥육 신청 거절 중 오류 발생:' + error.message);
    } else {
      throw new Error('공동냥육 신청 거절 중 오류 발생:');
    }
  }
};

export const getCoParentCat = async (coParentId: number) => {
  try {
    const response = await fetchAuth(`/cats/co-parents/${coParentId}`, {
      method: 'GET',
      headers: { Accept: 'application/json', ...getAuthHeader() }
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('공동냥육 고양이 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('공동냥육 고양이 조회 중 오류 발생:');
    }
  }
};

type CoParentsSearchOption = {
  page: number;
  size: number;
  keyword: string;
  'cat-id': number;
};

export const getCoParents = async (reqObj: CoParentsSearchOption) => {
  try {
    const response = await fetchAuth(
      `/cats/co-parents/members?${objectToQueryString(reqObj)}`,
      {
        method: 'GET',
        headers: { Accept: 'application/json', ...getAuthHeader() }
      }
    );
    if (response.body) {
      const responseBody = await response.text();
      const parsedBody = JSON.parse(responseBody);
      return parsedBody;
    } else {
      throw new Error('응답 본문이 없습니다.');
    }
  } catch (error) {
    if (error instanceof Error) {
      throw new Error('함께할 공동집사 찾기 중 오류 발생: ' + error.message);
    }
  }
};

export const cancelCoParenting = async (reqObj: {
  catId: number;
  memberId: number;
}) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuthJson(
      `/cats/co-parents/cancel?cat-id=${reqObj.catId}&requested-member-id=${reqObj.memberId}`,
      requestOptions
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    return response.body;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('공동냥육 신청 취소 중 오류 발생:' + error.message);
    } else {
      throw new Error('공동냥육 신청 취소 중 오류 발생:');
    }
  }
};

export const deleteCat = async (id: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(`/cats/${id}`, requestOptions);
    if (!response.ok) {
      const msg = await (async () => {
        try {
          const body = await response.text();
          return body || '요청 실패';
        } catch {
          return '요청 실패';
        }
      })();

      throw new Error(msg);
    }
    return true;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('고양이 삭제 중 오류 발생:' + error.message);
    } else {
      throw new Error('고양이 삭제 중 오류 발생:');
    }
  }
};
