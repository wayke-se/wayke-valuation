interface RequestOptions {
  url: string;
  method: 'GET' | 'POST';
  body?: any;
  headers?: { [key: string]: string | undefined };
}

// Using callbacks:
function _fetch<Response>(
  options: RequestOptions,
  callback?: (response: Response) => void,
  errorCallback?: (err: any) => void
) {
  const request = new XMLHttpRequest();
  request.open(options.method, options.url, true);
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      const data = JSON.parse(this.response) as Response;
      if (callback) {
        callback(data);
      }
    } else {
      if (errorCallback) {
        errorCallback(new Error(request.statusText));
      }
    }
  };

  request.onerror = function (err) {
    // There was a connection error of some sort
    if (errorCallback) {
      errorCallback(err);
    }
  };
  if (options.method === 'POST') {
    request.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');
  }

  if (options?.headers) {
    Object.keys(options.headers).forEach((key) => {
      const value = options.headers?.[key];
      if (value) {
        request.setRequestHeader(key, value);
      }
    });
  }

  const body: Document | BodyInit | null | undefined = options.body
    ? JSON.stringify(options.body)
    : undefined;

  request.send(body);
}

// Using promises:
export function sendRequest<Response>(options: RequestOptions): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    _fetch(options, resolve, reject);
  });
}
