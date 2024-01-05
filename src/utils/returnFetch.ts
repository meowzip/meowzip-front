export type FetchArgs = [string | URL, RequestInit | undefined];

export type ReturnFetch = typeof returnFetch;

export type ReturnFetchDefaultOptions = {
  fetch?: ReturnType<ReturnFetch>;
  baseUrl?: string | URL;
  headers?: HeadersInit;
  interceptors?: {
    request?: (
      requestArgs: FetchArgs,
      fetch: NonNullable<ReturnFetchDefaultOptions['fetch']>
    ) => Promise<FetchArgs>;
    response?: (
      response: Response,
      requestArgs: FetchArgs,
      fetch: NonNullable<ReturnFetchDefaultOptions['fetch']>
    ) => Promise<Response>;
  };
};

const applyDefaultOptions = (
  [input, requestInit]: FetchArgs,
  defaultOptions?: ReturnFetchDefaultOptions
): FetchArgs => {
  const headers = new Headers(defaultOptions?.headers);
  new Headers(requestInit?.headers).forEach((value, key) => {
    headers.set(key, value);
  });

  let inputToReturn: FetchArgs[0] = input;
  if (defaultOptions?.baseUrl) {
    const baseUrl = new URL(defaultOptions.baseUrl);
    inputToReturn = new URL(
      baseUrl.pathname + input,
      defaultOptions.baseUrl
    ).toString();
  }

  return [
    inputToReturn,
    {
      ...requestInit,
      headers
    }
  ];
};

const mergeRequestObjectWithRequestInit = (
  request: Request,
  requestInit?: RequestInit
): Promise<RequestInit> => {
  const mergedRequest = new Request(request, requestInit);
  return new Response(mergedRequest.body).arrayBuffer().then(body => ({
    method: mergedRequest.method,
    headers: mergedRequest.headers,
    body: body,
    referrer: mergedRequest.referrer,
    referrerPolicy: mergedRequest.referrerPolicy,
    mode: mergedRequest.mode,
    credentials: mergedRequest.credentials,
    cache: mergedRequest.cache,
    redirect: mergedRequest.redirect,
    integrity: mergedRequest.integrity,
    keepalive: mergedRequest.keepalive,
    signal: mergedRequest.signal,
    window: requestInit?.window
  }));
};

const normalizeArgs = async (
  ...args: Parameters<typeof fetch>
): Promise<FetchArgs> => {
  let input: string | URL;
  let requestInit: RequestInit | undefined;
  if (args[0] instanceof Request) {
    input = args[0].url;
    requestInit = await mergeRequestObjectWithRequestInit(args[0], args[1]);
  } else {
    input = args[0];
    requestInit = args[1];
  }
  return [input, requestInit];
};

const returnFetch =
  (defaultOptions?: ReturnFetchDefaultOptions) =>
  async (...args: Parameters<typeof fetch>): Promise<Response> => {
    const defaultOptionAppliedArgs = applyDefaultOptions(
      await normalizeArgs(...args),
      defaultOptions
    );

    // apply request interceptor
    const fetchProvided = defaultOptions?.fetch || fetch;
    let requestInterceptorAppliedArgs: FetchArgs;
    if (defaultOptions?.interceptors?.request) {
      requestInterceptorAppliedArgs =
        await defaultOptions?.interceptors?.request?.(
          defaultOptionAppliedArgs,
          fetchProvided
        );
    } else {
      requestInterceptorAppliedArgs = defaultOptionAppliedArgs;
    }

    const response = await fetchProvided(...requestInterceptorAppliedArgs);

    // apply response interceptor
    return (
      defaultOptions?.interceptors?.response?.(
        response,
        requestInterceptorAppliedArgs,
        fetchProvided
      ) || response
    );
  };

export default returnFetch;
