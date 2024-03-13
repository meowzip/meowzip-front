import { objectToQueryString } from '@/utils/common';
import returnFetch from '@/utils/returnFetch';
import { getCookie } from '@/utils/common';
import { useQuery } from '@tanstack/react-query';

type DiarySearchOption = {
  page: number;
  size: number;
  date: string;
};

const memberToken = getCookie('Authorization');
const fetchExtendedAuth = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_MEOW_API,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${memberToken}`
  }
});

export const useDiaries = ({ date, page, size }: DiarySearchOption) => {
  const fetchDiaries = async (reqObj: DiarySearchOption) => {
    const response = await fetchExtendedAuth(
      `/diaries?${objectToQueryString(reqObj)}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.items || [];
  };

  return useQuery({
    queryKey: ['diaries', page, size, date],
    queryFn: () => fetchDiaries({ date, size, page }),
    staleTime: 1000 * 60 * 10
  });
};
