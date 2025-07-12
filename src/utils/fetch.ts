import returnFetch from '@/utils/returnFetch';
import returnFetchJson from '@/utils/returnFetchJson';

const getTokenFromCookie = (): string | null => {
  if (typeof document === 'undefined') return null;

  const cookies = document.cookie.split(';');
  const authCookie = cookies.find(cookie =>
    cookie.trim().startsWith('Authorization=')
  );

  if (authCookie) {
    return authCookie.split('=')[1];
  }

  return null;
};

const isTokenExpired = (token: string): boolean => {
  if (!token) return true;

  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    const currentTime = Math.floor(Date.now() / 1000);
    return payload.exp < currentTime + 30;
  } catch (error) {
    return true;
  }
};

let isRefreshing = false;
let refreshPromise: Promise<string | null> | null = null;

const refreshTokenIfNeeded = async (): Promise<string | null> => {
  if (isRefreshing && refreshPromise) {
    return refreshPromise;
  }

  isRefreshing = true;
  refreshPromise = (async () => {
    try {
      const response = await fetch('/api/auth/refresh-token', {
        method: 'POST',
        credentials: 'include'
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.accessToken) {
          return data.accessToken;
        }
      }

      console.error('토큰 리프레시 실패:', response.status);

      if (
        typeof window !== 'undefined' &&
        (response.status === 401 || response.status === 403)
      ) {
        window.location.href = '/signin';
      }

      return null;
    } catch (error) {
      console.error('토큰 리프레시 에러:', error);
      return null;
    } finally {
      isRefreshing = false;
      refreshPromise = null;
    }
  })();

  return refreshPromise;
};

export const fetchAuth = returnFetch({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API + '/api/auth/v1.0.0',
  interceptors: {
    request: async ([url, requestInit], fetch) => {
      let token = getTokenFromCookie();

      if (!token || isTokenExpired(token)) {
        const newToken = await refreshTokenIfNeeded();
        if (newToken) {
          token = newToken;
        }
      }

      const headers = new Headers(requestInit?.headers);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return [
        url,
        {
          ...requestInit,
          headers,
          credentials: 'include'
        }
      ];
    },
    response: async (response, [url, requestInit], fetch) => {
      if (response.status === 401) {
        const newToken = await refreshTokenIfNeeded();
        if (newToken) {
          const headers = new Headers(requestInit?.headers);
          headers.set('Authorization', `Bearer ${newToken}`);

          const retryResponse = await fetch(url, {
            ...requestInit,
            headers,
            credentials: 'include'
          });

          return retryResponse;
        }
      }

      return response;
    }
  }
});

export const fetchAuthJson = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API + '/api/auth/v1.0.0',
  headers: { Accept: 'application/json' },
  interceptors: {
    request: async ([url, requestInit], fetch) => {
      let token = getTokenFromCookie();

      if (!token || isTokenExpired(token)) {
        const newToken = await refreshTokenIfNeeded();
        if (newToken) {
          token = newToken;
        }
      }

      const headers = new Headers(requestInit?.headers);
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }

      return [
        url,
        {
          ...requestInit,
          headers,
          credentials: 'include'
        }
      ];
    },
    response: async (response, [url, requestInit], fetch) => {
      if (response.status === 401) {
        const newToken = await refreshTokenIfNeeded();
        if (newToken) {
          const headers = new Headers(requestInit?.headers);
          headers.set('Authorization', `Bearer ${newToken}`);

          const retryResponse = await fetch(url, {
            ...requestInit,
            headers,
            credentials: 'include'
          });

          return retryResponse;
        }
      }

      return response;
    }
  }
});

export const fetchPublicJson = returnFetchJson({
  baseUrl: process.env.NEXT_PUBLIC_MEOW_API + '/api/public/v1.0.0',
  headers: { Accept: 'application/json' }
});
