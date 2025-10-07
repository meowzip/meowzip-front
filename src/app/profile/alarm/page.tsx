import { getCoParentNotifications, getNotifications } from '@/services/profile';
import AlarmPageClient, {
  AlarmType
} from '@/components/profile/AlarmPageClient';
import { PageResponse } from '@/types/infiniteListType';

const AlarmPage = async () => {
  try {
    const [initialNotifications, initialCoParentNotifications] =
      await Promise.all([
        getNotifications({ page: 1, size: 20 }),
        getCoParentNotifications({ page: 1, size: 20 })
      ]);

    return (
      <AlarmPageClient
        initialNotifications={initialNotifications as PageResponse<AlarmType>}
        initialCoParentNotifications={
          initialCoParentNotifications as PageResponse<AlarmType>
        }
      />
    );
  } catch (error) {
    console.error('알림 로딩 실패:', error);
    return (
      <AlarmPageClient
        initialNotifications={{
          status: 'success',
          total: 0,
          hasNext: false,
          items: []
        }}
        initialCoParentNotifications={{
          status: 'success',
          total: 0,
          hasNext: false,
          items: []
        }}
      />
    );
  }
};

export default AlarmPage;
