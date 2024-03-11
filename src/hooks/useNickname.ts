import { validateNicknameOnServer } from '@/services/nickname';
import { useQuery } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

/**
 * @description API - GET nickname
 */
export const useNickname = (query: string, enabled: boolean) => {
  const [nickObj, setNickObj] = useState({
    value: '',
    error: false,
    msg: ''
  });

  const { data } = useQuery({
    queryKey: ['getNickname', query],
    queryFn: () => validateNicknameOnServer(query),
    enabled: !!enabled
  });

  useEffect(() => {
    if (!data) return;

    const response = data as unknown as { status: string; message: string };

    setNickObj({
      value: query,
      error: response.status !== 'OK',
      msg: response?.message
    });
  }, [data]);

  return { nickObj };
};
