export const hideEmail = (email: string) => {
  const [local, domain] = email.split('@');
  const visiblePart = local.slice(0, 1);
  const hiddenPart = '*'.repeat(local.length - 1);
  return `${visiblePart}${hiddenPart}@${domain}`;
};

export const getCookie = (name: string): string => {
  const cookieValue = document.cookie
    .split('; ')
    .find(row => row.startsWith(`${encodeURIComponent(name)}=`))
    ?.split('=')[1];
  return cookieValue ? decodeURIComponent(cookieValue) : '';
};

interface CookieOptions {
  maxAge?: number; // in seconds
  expires?: Date | string;
  path?: string;
  domain?: string;
  secure?: boolean;
  sameSite?: 'Lax' | 'Strict' | 'None';
}

export const setCookie = (
  name: string,
  value: string,
  options: CookieOptions = {}
) => {
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (options.maxAge) {
    cookieString += `; max-age=${options.maxAge}`;
  }

  if (options.expires) {
    const expires =
      typeof options.expires === 'string'
        ? options.expires
        : options.expires.toUTCString();
    cookieString += `; expires=${expires}`;
  }

  if (options.path) {
    cookieString += `; path=${options.path}`;
  }

  if (options.domain) {
    cookieString += `; domain=${options.domain}`;
  }

  if (options.secure) {
    cookieString += '; secure';
  }

  if (options.sameSite) {
    cookieString += `; SameSite=${options.sameSite}`;
  }

  document.cookie = cookieString;
};

export const removeCookie = (
  name: string,
  path: string = '/',
  domain?: string
) => {
  let cookieString = `${encodeURIComponent(
    name
  )}=; path=${path}; max-age=0; Expires=Thu, 01 Jan 1970 00:00:01 GMT;`;

  if (domain) {
    cookieString += ` domain=${domain};`;
  }

  document.cookie = cookieString;
};
