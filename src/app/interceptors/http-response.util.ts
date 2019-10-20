import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpResponse, HttpHeaders } from '@angular/common/http';
import { ResponseOptions } from './interfaces';

export const STATUS = {
  CONTINUE: 100,
  SWITCHING_PROTOCOLS: 101,
  OK: 200,
  CREATED: 201,
  ACCEPTED: 202,
  NON_AUTHORITATIVE_INFORMATION: 203,
  NO_CONTENT: 204,
  RESET_CONTENT: 205,
  PARTIAL_CONTENT: 206,
  MULTIPLE_CHOICES: 300,
  MOVED_PERMANTENTLY: 301,
  FOUND: 302,
  SEE_OTHER: 303,
  NOT_MODIFIED: 304,
  USE_PROXY: 305,
  TEMPORARY_REDIRECT: 307,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  PAYMENT_REQUIRED: 402,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  NOT_ACCEPTABLE: 406,
  PROXY_AUTHENTICATION_REQUIRED: 407,
  REQUEST_TIMEOUT: 408,
  CONFLICT: 409,
  GONE: 410,
  LENGTH_REQUIRED: 411,
  PRECONDITION_FAILED: 412,
  PAYLOAD_TO_LARGE: 413,
  URI_TOO_LONG: 414,
  UNSUPPORTED_MEDIA_TYPE: 415,
  RANGE_NOT_SATISFIABLE: 416,
  EXPECTATION_FAILED: 417,
  IM_A_TEAPOT: 418,
  UPGRADE_REQUIRED: 426,
  INTERNAL_SERVER_ERROR: 500,
  NOT_IMPLEMENTED: 501,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
  GATEWAY_TIMEOUT: 504,
  HTTP_VERSION_NOT_SUPPORTED: 505,
  PROCESSING: 102,
  MULTI_STATUS: 207,
  IM_USED: 226,
  PERMANENT_REDIRECT: 308,
  UNPROCESSABLE_ENTRY: 422,
  LOCKED: 423,
  FAILED_DEPENDENCY: 424,
  PRECONDITION_REQUIRED: 428,
  TOO_MANY_REQUESTS: 429,
  REQUEST_HEADER_FIELDS_TOO_LARGE: 431,
  UNAVAILABLE_FOR_LEGAL_REASONS: 451,
  VARIANT_ALSO_NEGOTIATES: 506,
  INSUFFICIENT_STORAGE: 507,
  NETWORK_AUTHENTICATION_REQUIRED: 511
};

export function createResponseFromResponseOptions$(options: ResponseOptions):
  Observable<HttpResponse<any>> {
  return createResponseOptions$(options).pipe(map(
    opts => new HttpResponse<any>(opts),
  ));
}

export function createErrorResponseOptions(url: string, status: number, message: string):
  ResponseOptions {
  return {
    body: { error: `${message}` },
    url,
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
    status,
  };
}

function createResponseOptions$(options: ResponseOptions):
  Observable<ResponseOptions> {
  return new Observable<ResponseOptions>((responseObserver) => {
    if (options.status && options.status >= 200 && options.status < 300) {
      responseObserver.next(options);
      responseObserver.complete();
    } else {
      responseObserver.error(options);
    }
    return () => { }; // unsubscribe function
  });
}
