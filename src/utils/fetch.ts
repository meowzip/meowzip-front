import returnFetch from '@/utils/returnFetch';
import returnFetchJson from '@/utils/returnFetchJson';

export const fetch = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API + '/api/auth/v1.0.0'
});

export const fetchJson = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API + '/api/auth/v1.0.0'
});
