import { fetchExtended } from '@/services/cat';
import { fetchExtendedForm, fetchExtendedAuth } from '@/services/nickname';

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
