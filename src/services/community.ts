import {
  base64ToFile,
  getAuthHeader,
  objectToQueryString
} from '@/utils/common';
import { fetchAuth } from '@/utils/fetch';

type FeedSearchOption = {
  page: number;
  size: number;
};

export const getFeedsOnServer = async ({ page, size }: FeedSearchOption) => {
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(
      `/community?${objectToQueryString({ page, size })}`,
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
      throw new Error('게시글 목록 조회 중 오류 발생:' + error.message);
    } else {
      throw new Error('게시글 목록 조회 중 오류 발생:');
    }
  }
};

export const getFeedDetail = async (id: number) => {
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };
  const response = await fetchAuth(`/community/${id}`, requestOptions);
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }

  const data = await response.json();
  return data.data;
};

export const deleteFeedOnServer = async (id: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(`/community/${id}`, requestOptions);

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
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() },
    body: JSON.stringify({ postId })
  };

  try {
    const response = await fetchAuth(
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

export const reportFeedOnServer = async (postId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(
      `/community/${postId}/report`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('게시글 신고 중 오류 발생:' + error.message);
    } else {
      throw new Error('게시글 신고 중 오류 발생:');
    }
  }
};

export const registerFeedOnServer = async (reqObj: {
  content: string;
  images: string[];
}) => {
  const { images, content } = reqObj;
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
    headers: { Accept: 'application/json', ...getAuthHeader() },
    body: formData
  };

  try {
    const response = await fetchAuth('/community', requestOptions);

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
  const formData = new FormData();

  const imageUrls = images.filter(image => image.includes('http'));
  formData.append(
    'post',
    new Blob([JSON.stringify({ content: content, imageUrls: imageUrls })], {
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
    const response = await fetchAuth(`/community/${reqObj.id}`, requestOptions);

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

export const toggleLikeFeedOnServer = async (postId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(
      `/community/${postId}/like`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('게시글 좋아요 토글 중 오류 발생:' + error.message);
    } else {
      throw new Error('게시글 좋아요 토글 중 오류 발생:');
    }
  }
};

export const toggleBookmarkOnServer = async (postId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(
      `/community/${postId}/bookmark`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('게시글 북마크 중 오류 발생:' + error.message);
    } else {
      throw new Error('게시글 북마크 중 오류 발생:');
    }
  }
};

export const getFeedComments = async (postId: number) => {
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(
      `/community/${postId}/comments`,
      requestOptions
    );
    if (!response.ok) return;
    const data = response.json();
    return data;
  } catch {
    throw new Error('댓글 조회 중 오류 발생');
  }
};

export const registerCommentOnServer = async (reqObj: {
  postId: number;
  content: string;
  parentCommentId?: number;
}) => {
  const reqParams: {
    content: string;
    parentCommentId?: number;
  } = {
    content: reqObj.content
  };

  if (reqObj.parentCommentId) {
    reqParams.parentCommentId = reqObj.parentCommentId;
  }

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...getAuthHeader() },
    body: JSON.stringify(reqParams)
  };

  try {
    const response = await fetchAuth(
      `/community/${reqObj.postId}/comments`,
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

export const deleteCommentOnServer = async ({
  postId,
  commentId
}: {
  postId: number;
  commentId: number;
}) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(
      `/community/${postId}/comments/${commentId}`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('댓글 삭제 중 오류 발생:' + error.message);
    } else {
      throw new Error('댓글 삭제 중 오류 발생:');
    }
  }
};
export const blockCommentWriterOnServer = async (postId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(
      `/community/${postId}/block-writer`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('댓글 작성자 차단 중 오류 발생:' + error.message);
    } else {
      throw new Error('댓글 작성자 차단 중 오류 발생:');
    }
  }
};

export const reportCommentOnServer = async ({
  postId,
  commentId
}: {
  postId: number;
  commentId: number;
}) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  try {
    const response = await fetchAuth(
      `/community/${postId}/comments/${commentId}/report`,
      requestOptions
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      throw new Error('댓글 신고 중 오류 발생:' + error.message);
    } else {
      throw new Error('댓글 신고 중 오류 발생:');
    }
  }
};
