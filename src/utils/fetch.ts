import returnFetch from '@/utils/returnFetch';
import returnFetchJson from '@/utils/returnFetchJson';

export const fetchAuth = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API + '/api/auth/v1.0.0'
});

export const fetchAuthJson = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API + '/api/auth/v1.0.0',
  headers: { Accept: 'application/json' }
});

export const fetchPublicJson = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API + '/api/public/v1.0.0',
  headers: { Accept: 'application/json' }
});
