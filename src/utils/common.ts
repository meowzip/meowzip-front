export const hideEmail = (email: string) => {
  const [local, domain] = email.split('@');
  const visiblePart = local.slice(0, 1);
  const hiddenPart = '*'.repeat(local.length - 1);
  return `${visiblePart}${hiddenPart}@${domain}`;
};

export const getCookie = (name: string): string => {
  if (typeof document !== 'undefined') {
    const cookieValue = document.cookie
      .split('; ')
      .find(row => row.startsWith(`${encodeURIComponent(name)}=`))
      ?.split('=')[1];
    return cookieValue ? decodeURIComponent(cookieValue) : '';
  }
  return '';
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

export const base64ToFile = (base64String: string | null, filename: string) => {
  // Split the base64 string into parts
  if (!base64String) return;

  const parts = base64String.split(';base64,');
  const decodedData = window.atob(parts[1]); // Decode base64 string

  // Convert decoded data to binary
  const uint8Array = new Uint8Array(decodedData.length);
  for (let i = 0; i < decodedData.length; ++i) {
    uint8Array[i] = decodedData.charCodeAt(i);
  }

  // Create a Blob from the binary data
  const blob = new Blob([uint8Array]);

  // Create a File from the Blob
  const file = new File([blob], filename);

  return file;
};

export const objectToQueryString = (
  obj: Record<string, string | number>
): string => {
  return Object.entries(obj)
    .map(
      ([key, value]) =>
        `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');
};

export const dateToString = (date: Date): string => {
  const localDate = new Date(date.getTime() - date.getTimezoneOffset() * 60000);

  const year = localDate.getFullYear();
  const month = (localDate.getMonth() + 1).toString().padStart(2, '0');
  const day = localDate.getDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};
