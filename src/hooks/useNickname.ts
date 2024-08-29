import { validateNicknameOnServer } from '@/services/nickname';
import { useQuery } from '@tanstack/react-query';

export const useNickname = (query: string, enabled: boolean) => {
  const { data } = useQuery({
    queryKey: ['getNickname', query],
    queryFn: () => validateNicknameOnServer(query),
    enabled: !!enabled
  });

  const response = data as unknown as { status: string; message: string };
  const error = response?.status !== 'OK';
  const message = response?.message;

  return { error, message };
};
