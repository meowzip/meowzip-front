import { getMyProfile } from '@/services/profile';
import { useQuery } from '@tanstack/react-query';
import { useAtom } from 'jotai';
import { newNotificationAtom } from '@/atoms/notificationAtom';
import { useEffect } from 'react';

export default function useMyProfileQuery() {
  const [_, setNewNotification] = useAtom(newNotificationAtom);

  const query = useQuery({
    queryKey: ['myProfile'],
    queryFn: () => getMyProfile()
  });

  useEffect(() => {
    if (query.data?.existsNewNotification !== undefined) {
      setNewNotification(query.data.existsNewNotification);
    }
  }, [query.data?.existsNewNotification, setNewNotification]);

  return query;
}
