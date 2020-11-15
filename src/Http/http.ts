import { ValuationResponse } from '../@types/Valuation';

// Using callbacks:
function _fetch<Response>(
  method: 'GET' | 'POST',
  url: string,
  content?: any,
  callback?: (response: Response) => void,
  errorCallback?: (err: any) => void
) {
  const request = new XMLHttpRequest();
  request.open(method, url, true);
  request.onload = function () {
    if (this.status >= 200 && this.status < 400) {
      // Success!
      const data = JSON.parse(this.response) as Response;
      if (callback) {
        callback(data);
      }
    } else {
      // We reached our target server, but it returned an error
    }
  };

  request.onerror = function (err) {
    // There was a connection error of some sort
    if (errorCallback) {
      errorCallback(err);
    }
  };
  if (method === 'POST') {
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
  }

  request.send((content as unknown) as Document | BodyInit | null);
}

// Using promises:
export function sendRequest<Response>(
  method: 'GET' | 'POST',
  url: string,
  content?: any
): Promise<Response> {
  return new Promise<Response>((resolve, reject) => {
    _fetch(method, url, content, resolve, reject);
  });
}

const mockedRepsonse: ValuationResponse = {
  successful: true,
  response: {
    registrationNumber: 'NYA710',
    manufacturer: 'Hyundai',
    modelName: '1.6 CRDi',
    modelSeries: 'i30',
    modelYear: 2014,
    valuation: 105390.0,
  },
  requestForgeryToken:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1cm46d2F5a2U6cmYtdG9rZW46ZWNvbTp0b2tlbl9pZCI6ImRkY2Q4YmYxLTI3MTItNDgxZS1hZjViLTAzODkwMWQzNGZiOCIsInVybjp3YXlrZTpyZi10b2tlbjplY29tOnZlaGljbGVfaWQiOiIxZTE4NmY1Zi05NTNhLTRiMzMtOGY2Yi01YTY3YzMxZWQ2ZGYiLCJ1cm46d2F5a2U6cmYtdG9rZW46ZWNvbTpicmFuY2hfaWQiOiJlNDdjNjc0YS05ZjBjLTQyMjQtOWE4OC0zYTNmNDllNTQxMzQiLCJ1cm46d2F5a2U6cmYtdG9rZW46ZWNvbTp0cmFkZS1pbi1yZWdpc3RyYXRpb24tbnVtYmVyIjoiTnlhNzEwIiwibmJmIjoxNjA1NDM4MTI0LCJleHAiOjE2MDU0Mzk5MjQsImlhdCI6MTYwNTQzODEyNCwiaXNzIjoid2F5a2UtZWNvbSJ9.ou6POyAQXETq6SLS3jRTIggPgACtNMN6X0xK1WGzrjw',
};

export function sendRequestValuation(
  _method: 'GET' | 'POST',
  _url: string,
  _content?: any
): Promise<ValuationResponse> {
  return new Promise<ValuationResponse>((resolve) => {
    setTimeout(resolve.bind(null, mockedRepsonse), 1000);
  });
}
