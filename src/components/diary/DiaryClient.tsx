'use client';

import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { diaryDateAtom } from '@/store/diaryAtom';
import { dateToString } from '@/utils/common';
import DiaryListLayout from '@/components/diary/DiaryListLayout';
import useInfiniteDiaries from '@/hooks/diary/useInfiniteDiaries';
import CatFilterList from '@/components/diary/CatFilterList';
import DiaryList from '@/components/diary/DiaryList';
import useInfiniteCats from '@/hooks/diary/useInfiniteCats';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { usePushPermission } from '@/hooks/common/usePushPermission';
import { togglePushNotificationOnServer } from '@/services/push-notification';

const DiaryClient = () => {
  const router = useRouter();
  const { ref: catsRef, inView: catsInView } = useInView();
  const { ref: diaryRef, inView: diaryInView } = useInView();

  const [diaryDate] = useAtom(diaryDateAtom);
  const [selectedCatId, setSelectedCatId] = useState<number | null>(null);

  const { catList, isCatsLoading, isCatListError, catListError } =
    useInfiniteCats(catsInView);

  const { diaryList, isDiaryLoading, isDiaryListError, diaryListError } =
    useInfiniteDiaries({
      inView: diaryInView,
      date: dateToString(diaryDate),
      selectedCatId
    });

  const handleCatSelect = (id: number) => {
    setSelectedCatId(prev => (prev === id ? null : id));
  };

  const handleDiaryClick = (id: number) => {
    router.push(`/diary/${id}`);
  };

  // -------------- test -------------- //
  const queryClient = useQueryClient();
  useEffect(() => {
    const permission = localStorage.getItem('push_permission') || '';
    console.log('permission', permission);
  }, []);
  const { pushPermissionEnabled } = usePushPermission();
  console.log('pushPermissionEnabled: ', pushPermissionEnabled);
  const togglePushNotification = useMutation({
    mutationFn: () => togglePushNotificationOnServer(),
    onSuccess: (data: any) => {
      if (data.status === 'OK') {
        queryClient.invalidateQueries({
          predicate: query => query.queryKey[0] === 'getPushNoti'
        });
      }
    }
  });
  useEffect(() => {
    togglePushNotification.mutate();
  }, [pushPermissionEnabled]);
  // -------------- test end -------------- //

  if (isCatListError) throw catListError;
  if (isDiaryListError) throw diaryListError;

  return (
    <>
      <DiaryListLayout>
        <CatFilterList
          catList={catList}
          isLoading={isCatsLoading}
          selectedCatId={selectedCatId}
          onSelect={handleCatSelect}
          catsRef={catsRef}
        />
        <DiaryList
          diaryList={diaryList}
          isLoading={isDiaryLoading}
          diaryRef={diaryRef}
          onClick={handleDiaryClick}
        />
      </DiaryListLayout>
    </>
  );
};

export default DiaryClient;
