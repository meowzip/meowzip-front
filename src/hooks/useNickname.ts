import { validateNicknameOnServer } from '@/services/nickname';
import { useQuery } from '@tanstack/react-query';

export const useNickname = (query: string, enabled: boolean) => {
  const { data, isError } = useQuery({
    queryKey: ['getNickname', query],
    queryFn: () => validateNicknameOnServer(query),
    enabled: !!enabled
  });

  const response = data as unknown as { status: string; message: string };
  const error = response?.status !== 'OK';
  const message = response?.message;

  if (isError) throw error;
  return { error, message };
};
