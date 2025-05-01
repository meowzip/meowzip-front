'use client';
import AlarmList from '@/components/profile/AlarmList';
import Topbar from '@/components/ui/Topbar';
import { notFound, useRouter } from 'next/navigation';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/TabsWithLine';
import {
  useInfiniteQuery,
  useMutation,
  useQueryClient
} from '@tanstack/react-query';
import {
  getCoParentNotifications,
  getNotifications,
  readAllNotificationOnServer
} from '@/services/profile';
import AlarmEmptyState from '@/components/profile/AlarmEmptyState';
import AlarmListSkeleton from '@/components/profile/AlarmListSkeleton';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';
import { useAtom } from 'jotai';
import { newNotificationAtom } from '@/atoms/notificationAtom';

export interface AlarmType {
  id: number;
  title: string;
  link: string;
  senderNickname: string;
  createdAt: string;
  isRead: boolean;
  type: 'COMMENT' | 'LIKE' | 'DIARY' | 'COPARENT_REQUEST' | 'COPARENT';
  isExpired?: boolean;
  isResponded?: boolean;
}

const AlarmPage = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [_, setHasNewNotification] = useAtom(newNotificationAtom);
  const { ref: notiRef, inView: notiInView } = useInView();
  const { ref: coParentRef, inView: coParentInView } = useInView();

  const {
    data: notifications,
    isLoading: notiIsLoading,
    fetchNextPage: fetchNextNotifications,
    refetch: refetchNotifications,
    isError: isNotiError,
    error: notiError
  } = useInfiniteQuery({
    queryKey: ['getNotifications'],
    queryFn: ({ pageParam = 1 }) =>
      getNotifications({
        page: pageParam,
        size: 20
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0
  });
  useEffect(() => {
    if (notiInView) {
      fetchNextNotifications();
    }
  }, [notiInView, fetchNextNotifications]);

  const {
    data: coParentsNoti,
    isLoading: coParentIsLoading,
    fetchNextPage: fetchNextCoparentNofi,
    refetch: refetchCoParentNotifications,
    isError: isCoParentNotiError,
    error: coParentsNotiError
  } = useInfiniteQuery({
    queryKey: ['getCoparentsNotifications'],
    queryFn: ({ pageParam = 1 }) =>
      getCoParentNotifications({
        page: pageParam,
        size: 20
      }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasNext ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
    staleTime: 0
  });
  useEffect(() => {
    if (coParentInView) {
      fetchNextCoparentNofi();
    }
  }, [coParentInView, fetchNextCoparentNofi]);

  const isNotiEmpty = useMemo(() => {
    return (
      Array.isArray(notifications?.pages?.[0]?.items) &&
      notifications.pages[0].items.length === 0
    );
  }, [notifications]);

  const isCoParentEmpty = useMemo(() => {
    return (
      Array.isArray(coParentsNoti?.pages?.[0]?.items) &&
      coParentsNoti.pages[0].items.length === 0
    );
  }, [coParentsNoti]);

  const readAllNotification = useMutation({
    mutationFn: () => readAllNotificationOnServer(),
    onSuccess: (data: any) => {
      if (data.status !== 'OK') {
        console.log('error');
      } else {
        setHasNewNotification(false);
        refetchNotifications();
        refetchCoParentNotifications();
        queryClient.invalidateQueries({ queryKey: ['myProfile'] });
      }
    }
  });

  if (isNotiError) throw notiError;
  if (isCoParentNotiError) throw coParentsNotiError;

  return (
    <div className="fixed left-1/2 top-0 z-20 h-screen w-full max-w-[640px] -translate-x-1/2 overflow-y-auto bg-gr-white">
      <Topbar type="three">
        <Topbar.Back onClick={() => router.push('/profile')} />
        <Topbar.Title title="내 소식" />
        <Topbar.AllRead onClick={() => readAllNotification.mutate()} />
      </Topbar>
      <Tabs
        defaultValue="notice"
        className="h-screen items-end bg-gr-white pt-12"
      >
        <TabsList className="h-11 items-end">
          <TabsTrigger value="notice">활동 알림</TabsTrigger>
          <TabsTrigger value="coParentNotice">공동냥육</TabsTrigger>
        </TabsList>
        <TabsContent value="notice" className="mx-auto mt-0 max-w-[640px]">
          {notiIsLoading ? (
            <AlarmListSkeleton />
          ) : isNotiEmpty ? (
            <div className="flex h-[calc(100vh-90px)] items-center justify-center bg-gr-50">
              <AlarmEmptyState />
            </div>
          ) : (
            <>
              {notifications?.pages?.map(page =>
                page?.items?.map((noti: AlarmType) => (
                  <div key={noti.id}>
                    <AlarmList alarm={noti} refetch={refetchNotifications} />
                  </div>
                ))
              )}
              <div ref={notiRef} className="h-20 bg-transparent" />
            </>
          )}
        </TabsContent>
        <TabsContent
          value="coParentNotice"
          className="mx-auto mt-0 max-w-[640px]"
        >
          {coParentIsLoading ? (
            <AlarmListSkeleton />
          ) : isCoParentEmpty ? (
            <div className="flex h-[calc(100vh-90px)] items-center justify-center bg-gr-50">
              <AlarmEmptyState />
            </div>
          ) : (
            <>
              {coParentsNoti?.pages?.map(page =>
                page?.items?.map((noti: AlarmType) => (
                  <div key={noti.id}>
                    <AlarmList
                      alarm={noti}
                      refetch={refetchCoParentNotifications}
                    />
                  </div>
                ))
              )}
              <div ref={coParentRef} className="h-20 bg-transparent" />
            </>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AlarmPage;
