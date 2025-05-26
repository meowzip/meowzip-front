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
  try {
    // null 체크
    if (!base64String) {
      console.warn('base64ToFile: base64String is null or undefined');
      return null;
    }

    // base64 형식 확인
    if (!base64String.includes('data:')) {
      console.warn(
        'base64ToFile: Invalid base64 string format (missing "data:" prefix)'
      );
      return null;
    }

    const parts = base64String.split(';base64,');
    if (parts.length !== 2) {
      console.warn(
        'base64ToFile: Invalid base64 string format (incorrect structure)'
      );
      return null;
    }

    // 디코딩 시도
    let decodedData;
    try {
      decodedData = window.atob(parts[1]);
    } catch (e) {
      console.error('base64ToFile: Failed to decode base64 string', e);
      return null;
    }

    // 이진 데이터로 변환
    const uint8Array = new Uint8Array(decodedData.length);
    for (let i = 0; i < decodedData.length; ++i) {
      uint8Array[i] = decodedData.charCodeAt(i);
    }

    // Blob 및 File 생성
    const blob = new Blob([uint8Array]);
    const file = new File([blob], filename);

    return file;
  } catch (error) {
    console.error('base64ToFile: Unexpected error', error);
    return null;
  }
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
  const year = date.getUTCFullYear();
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const day = date.getUTCDate().toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
};

interface CookieAttributes {
  token: string;
  path: string;
  maxAge: string;
  expires: string;
  secure: boolean;
  httpOnly: boolean;
  sameSite: string;
}

export const parseCookieString = (cookieString: string): CookieAttributes => {
  const attributes: Partial<CookieAttributes> = {};
  const parts = cookieString.split(';').map(part => part.trim());

  const tokenPart = parts.shift();
  if (tokenPart) {
    const [name, token] = tokenPart.split('=');
    if (name === 'Authorization-Refresh') {
      attributes.token = token;
    }
  }

  parts.forEach(part => {
    const [key, value] = part.split('=');
    switch (key) {
      case 'Path':
        attributes.path = value;
        break;
      case 'Max-Age':
        attributes.maxAge = value;
        break;
      case 'Expires':
        attributes.expires = value;
        break;
      case 'Secure':
        attributes.secure = true;
        break;
      case 'HttpOnly':
        attributes.httpOnly = true;
        break;
      case 'SameSite':
        attributes.sameSite = value;
        break;
    }
  });
  return attributes as CookieAttributes;
};

export const logFormData = (
  formData: FormData | URLSearchParams | Record<string, string>
) => {
  if (formData instanceof FormData) {
    for (let pair of formData.entries()) {
      if (pair[1] instanceof File) {
        const reader = new FileReader();
        reader.onload = event => {
          if (!event.target?.result) return;
        };
        reader.readAsText(pair[1]);
      } else {
        console.log(`${pair[0]}: ${pair[1]}`);
      }
    }
  } else if (formData instanceof URLSearchParams) {
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }
  } else {
    for (let key in formData) {
      console.log(`${key}: ${formData[key]}`);
    }
  }
};

export const getCurrentDateInYYYYMMDD = () => {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const date = today.getDate();
  return `${year}.${month}.${date}`;
};

export const getMemberToken = () => {
  return getCookie('Authorization');
};
