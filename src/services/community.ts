import {
  base64ToFile,
  getAuthHeader,
  objectToQueryString
} from '@/utils/common';
import { fetchAuthJson } from '@/utils/fetch';
import { FeedType } from '@/types/communityType';
import { PageResponse } from '@/types/infiniteListType';

type FeedSearchOption = {
  page: number;
  size: number;
};

export const getFeedsOnServer = async ({ page, size }: FeedSearchOption) => {
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  const response = await fetchAuthJson<PageResponse<FeedType>>(
    `/community?${objectToQueryString({ page, size })}`,
    requestOptions
  );

  return response.body;
};

export const getFeedDetail = async (id: number): Promise<FeedType> => {
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };
  const response = await fetchAuthJson<{ data: FeedType }>(
    `/community/${id}`,
    requestOptions
  );
  return response.body.data;
};

export const deleteFeedOnServer = async (id: number) => {
  const requestOptions = {
    method: 'DELETE',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  const response = await fetchAuthJson(`/community/${id}`, requestOptions);
  return response.body;
};

export const blockWriterOnServer = async (postId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() },
    body: { postId }
  };

  const response = await fetchAuthJson(
    `/community/${postId}/block-writer`,
    requestOptions
  );
  return response.body;
};

export const reportFeedOnServer = async (postId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  const response = await fetchAuthJson(
    `/community/${postId}/report`,
    requestOptions
  );
  return response.body;
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

  const response = await fetchAuthJson('/community', requestOptions);
  return response.body;
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

  const response = await fetchAuthJson(
    `/community/${reqObj.id}`,
    requestOptions
  );
  return response.body;
};

export const toggleLikeFeedOnServer = async (postId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  const response = await fetchAuthJson(
    `/community/${postId}/like`,
    requestOptions
  );
  return response.body;
};

export const toggleBookmarkOnServer = async (postId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  const response = await fetchAuthJson(
    `/community/${postId}/bookmark`,
    requestOptions
  );
  return response.body;
};

export const getFeedComments = async (postId: number) => {
  const requestOptions = {
    method: 'GET',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  const response = await fetchAuthJson(
    `/community/${postId}/comments`,
    requestOptions
  );
  return response.body;
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
    body: reqParams
  };

  const response = await fetchAuthJson(
    `/community/${reqObj.postId}/comments`,
    requestOptions
  );
  return response.body;
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

  const response = await fetchAuthJson(
    `/community/${postId}/comments/${commentId}`,
    requestOptions
  );
  return response.body;
};
export const blockCommentWriterOnServer = async (postId: number) => {
  const requestOptions = {
    method: 'POST',
    headers: { Accept: 'application/json', ...getAuthHeader() }
  };

  const response = await fetchAuthJson(
    `/community/${postId}/block-writer`,
    requestOptions
  );
  return response.body;
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

  const response = await fetchAuthJson(
    `/community/${postId}/comments/${commentId}/report`,
    requestOptions
  );
  return response.body;
};
