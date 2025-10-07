import { getPushNotification } from '@/services/push-notification';
import SettingPageClient from '@/components/setting/SettingPageClient';

const SettingPage = async () => {
  try {
    const initialPushPermission = await getPushNotification();

    return <SettingPageClient initialPushPermission={initialPushPermission} />;
  } catch (error) {
    console.error('설정 로딩 실패:', error);
    return (
      <SettingPageClient
        initialPushPermission={{ receivePushNotification: false }}
      />
    );
  }
};

export default SettingPage;
