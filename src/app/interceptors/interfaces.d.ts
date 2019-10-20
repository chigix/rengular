/**
 * Mainly Referenced to
 * https://github.com/angular/in-memory-web-api/blob/master/src/in-mem/interfaces.ts
 *
 * TODO: Suits to NgRx Data
 */
import { Observable } from 'rxjs';
import {
  HttpRequest, HttpResponse,
} from '@angular/common/http';

type GetConstructorArgs<T> = T extends new (arg: infer U) => any ? U : never;

export type ResponseOptions = GetConstructorArgs<typeof HttpResponse>;

export type RecordId = string | number;

/**
 * Interface for a class that creates an in-memory database
 *
 * @export
 * @abstract
 * @class InMemoryDbService
 */
export interface InMemoryDbService {
  /**
   * Creates an in-memory "database" hash whose keys are collection names
   * and whose values are arrays of collection objects to return or update.
   *
   * This method must be safe to call repeatedly.
   */
  createDb(): {} | Observable<{}> | Promise<{}>;
}

/**
 * Interface for the result of the `parseRequestUrl` method:
 *   Given URL "http://localhost:8080/api/customers/42?foo=1"
 *   the default implementation returns:
 *     base: 'api/'
 *     collectionName: 'customers'
 *     id: '42'
 *     query: this.createQuery('foo=1')
 *     resourceUrl: 'http://localhost/api/customers'
 */
export interface ParsedRequestUrl {
  apiBase: string;
  collectionName: string;
  id: string;
  query: Map<string, string[]>;
  resourceUrl: string;
}

/**
 * Interface for object info about the current request url
 * extracted from an Http Request.
 * Also holds utility methods and configuration data from this service
 */
export interface RequestInfo {
  req: HttpRequest<any>; // concrete type depends upon the Http library
  apiBase: string;
  collectionName: string;
  collection: any;
  // TODO: headers: HeadersCore;
  method: string;
  id?: RecordId;
  query: Map<string, string[]>;
  resourceUrl: string;
  url: string; // request URL
}

/** Interface of information about a Uri  */
export interface UriInfo {
  source: string;
  protocol: string;
  authority: string;
  userInfo: string;
  user: string;
  password: string;
  host: string;
  port: string;
  relative: string;
  path: string;
  directory: string;
  file: string;
  query: string;
  anchor: string;
}
