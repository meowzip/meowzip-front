import { objectToQueryString } from '@/utils/common';
import returnFetch from '@/utils/returnFetch';
import { getCookie } from '@/utils/common';
import { useQuery } from '@tanstack/react-query';
import { DiaryRegisterReqObj } from '@/app/diary/diaryType';

type CatSearchOption = {
  page: number;
  size: number;
};

interface DiaryObj extends DiaryRegisterReqObj {
  id: number;
}

const memberToken = getCookie('Authorization');
const fetchExtendedAuth = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_AUTH_MEOW_API,
  headers: {
    Accept: 'application/json',
    Authorization: `Bearer ${memberToken}`
  }
});

export const useCats = ({ page, size }: CatSearchOption) => {
  const fetchCats = async (reqObj: CatSearchOption) => {
    const response = await fetchExtendedAuth(
      `/cats?${objectToQueryString(reqObj)}`
    );
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();

    const sortByLatest = data.items.sort(
      (a: DiaryObj, b: DiaryObj) => b.id - a.id
    );
    return sortByLatest || [];
  };

  return useQuery({
    queryKey: ['getCats', page, size],
    queryFn: () => fetchCats({ size, page }),
    staleTime: 1000 * 60 * 10
  });
};

export const useCatDetail = (id: number) => {
  const fetchCatDetail = async (id: number) => {
    const response = await fetchExtendedAuth(`/cats/${id}`);
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data = await response.json();
    return data.data;
  };

  return useQuery({
    queryKey: ['catDetail', id],
    queryFn: () => fetchCatDetail(id),
    staleTime: 1000 * 60 * 10
  });
};
