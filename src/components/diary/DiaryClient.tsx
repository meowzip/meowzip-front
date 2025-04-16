'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAtom } from 'jotai';
import { useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { useQueryClient, useMutation } from '@tanstack/react-query';

import { diaryDateAtom } from '@/store/diaryAtom';
import { dateToString } from '@/utils/common';
import { togglePushNotificationOnServer } from '@/services/push-notification';

import DiaryListLayout from '@/components/diary/DiaryListLayout';
import FloatingActionButton from '@/components/ui/FloatingActionButton';
import useInfiniteDiaries from '@/hooks/diary/useInfiniteDiaries';
import CatFilterList from '@/components/diary/CatFilterList';
import DiaryList from '@/components/diary/DiaryList';
import useInfiniteCats from '@/hooks/diary/useInfiniteCats';

const DiaryClient = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
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
    const handleMessage = (event: any) => {
      try {
        const data = JSON.parse(event.data);

        if (data.type === 'NOTIFICATION_PERMISSION') {
          console.log('📩 NOTIFICATION_PERMISSION:', data);
        }
      } catch (err) {
        console.error('메시지 파싱 오류:', err);
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, []);

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

      <Link href="/diary/write" scroll={false}>
        <FloatingActionButton />
      </Link>
    </>
  );
};

export default DiaryClient;
