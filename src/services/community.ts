import { fetchExtended } from '@/services/cat';
import { fetchExtendedForm, fetchExtendedAuth } from '@/services/nickname';
import { base64ToFile } from '@/utils/common';

export const getFeedsOnServer = async () => {
  const response = await fetchExtendedAuth('/community');
  if (!response.ok) return [];

  if (typeof response.body !== 'object') {
    console.error('fetchExtendedAuth에서 예상치 못한 응답 형식입니다.');
    return [];
  }

  const data = (response.body as any).items || [];
  return data;
};

export const getFeedDetail = async (id: number) => {
  const response = await fetchExtended(`/community/${id}`);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.data;
};

export const deleteFeedOnServer = async (id: number) => {
  const requestOptions = {
    method: 'DELETE'
  };

  try {
    const response = await fetchExtendedForm(
      `/community/${id}`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('게시글 삭제 중 오류 발생:' + error.message);
    } else {
      throw new Error('게시글 삭제 중 오류 발생:');
    }
  }
};

export const blockWriterOnServer = async (postId: number) => {
  const requestOptions = {
    method: 'POST'
  };

  try {
    const response = await fetchExtendedForm(
      `/community/${postId}/block-writer`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('게시글 차단 중 오류 발생:' + error.message);
    } else {
      throw new Error('게시글 차단 중 오류 발생:');
    }
  }
};

export const registerFeedOnServer = async (reqObj: {
  content: string;
  images: string[];
}) => {
  const { images, content } = reqObj;
  console.log('등록 content', content);
  const formData = new FormData();
  formData.append(
    'post',
    new Blob([JSON.stringify({ content: content })], {
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
    const response = await fetchExtendedForm('/community', requestOptions);

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('게시글 등록 중 오류 발생:' + error.message);
    } else {
      throw new Error('게시글 등록 중 오류 발생:');
    }
  }
};

export const editFeedOnServer = async (reqObj: {
  id: number;
  content: string;
  images: string[];
}) => {
  const { images, content } = reqObj;
  console.log('수정 content:', content);

  const formData = new FormData();
  formData.append(
    'post',
    new Blob([JSON.stringify({ content: content })], {
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
      `/community/${reqObj.id}`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('게시글 등록 중 오류 발생:' + error.message);
    } else {
      throw new Error('게시글 등록 중 오류 발생:');
    }
  }
};

export const getFeedComments = async (postId: number) => {
  try {
    const response = await fetchExtended(`/community/${postId}/comments`);
    if (!response.ok) return;
    const data = response.json();
    return data;
  } catch {
    throw new Error('댓글 조회 중 오류 발생');
  }
};
