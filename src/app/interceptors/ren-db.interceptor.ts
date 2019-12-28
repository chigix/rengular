import { Injectable } from '@angular/core';
import {
  HttpEvent, HttpInterceptor, HttpHandler, HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, from, of } from 'rxjs';
import { concatMap, first } from 'rxjs/operators';
import { isNullOrUndefined } from 'util';
import {
  InMemoryDbService, ParsedRequestUrl, RequestInfo, ResponseOptions, RecordId
} from './interfaces';
import { parseRequestUrl, parseId } from './url-parser.util';
import {
  createResponseFromResponseOptions$, createErrorResponseOptions, STATUS
} from './http-response.util';

export class RenDbInterceptor implements HttpInterceptor {

  protected dbReadySubject: BehaviorSubject<boolean>;
  protected db: object;

  constructor(
    /**
     * TODO: change to NgRx/store Implementation
     */
    protected inMemDbService: InMemoryDbService,
    protected location: string,
  ) { }

  /**
   * Main Interceptor Process implementing the HttpInterceptor interface.
   */
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.startsWith(this.location)) {
      return this.handleRequest(req);
    }
    return next.handle(req);
  }

  protected get dbReady(): Observable<boolean> {
    if (!this.dbReadySubject) {
      // first time the service is called
      this.dbReadySubject = new BehaviorSubject(false);
      try {
        this.resetDb();
      } catch (error) {
        console.error(error);
      }
    }
    return this.dbReadySubject.asObservable().pipe(first());
  }

  /**
   * Tell the in-mem database to reset.
   * @returns Observable of the database because resetting it could be async
   */
  protected resetDb(): Observable<boolean> {
    this.dbReadySubject.next(false);
    const db = this.inMemDbService.createDb();
    const db$ = db instanceof Observable ? db :
      typeof (db as any).then === 'function' ? from(db as Promise<any>) : of(db);
    db$.pipe(first()).subscribe((d: {}) => {
      this.db = d;
      this.dbReadySubject.next(true);
    });
    return this.dbReady;
  }

  /**
   * Process Request and return an Observable of Http Response object in the manner of a
   * RESTful web api.
   *
   * Expect URI pattern in the form :base/:collectionName/:id?
   *
   * Also accepts direct commands to the service in which the last segment of the apiBase
   * is the word "commands":
   *   POST commands/resetDb,
   *   Get/POST commands/config - get or (re)set the config
   */
  protected handleRequest(req: HttpRequest<any>): Observable<any> {
    // handle the request when there is an in-memory database
    // TODO: consider implement the in-memory database as a NgRx/store
    return this.dbReady.pipe(concatMap(() => {
      const url = req.urlWithParams ? req.urlWithParams : req.url;
      // TODO: provide ability to override the default parser
      const parsed: ParsedRequestUrl = parseRequestUrl(url, {});
      const collectionName = parsed.collectionName;
      const collection = this.db[collectionName];
      const reqInfo: RequestInfo = {
        req,
        apiBase: parsed.apiBase,
        collection, collectionName,
        // headers: this.createHeaders({ 'Content-Type': 'application/json' }),
        id: parseId(collection, collectionName, parsed.id),
        method: (req.method || 'get').toLowerCase(),
        query: parsed.query,
        resourceUrl: parsed.resourceUrl,
        url,
        // utils: this.requestInfoUtils
      };
      if (this.db[collectionName]) {
        return createResponseFromResponseOptions$(this.collectionHandler(reqInfo));
      }

      return createResponseFromResponseOptions$(createErrorResponseOptions(
        url, STATUS.NOT_FOUND, `Collection '${collectionName}' not found`,
      ));

    }));
  }

  protected collectionHandler(reqInfo: RequestInfo): ResponseOptions {
    switch (reqInfo.method) {
      case 'get':
        return this.get(reqInfo);
      default:
        return createErrorResponseOptions(
          reqInfo.url, STATUS.METHOD_NOT_ALLOWED, 'Method not allowed');
    }
  }

  protected get({ collection, collectionName, id, query, url }: RequestInfo): ResponseOptions {
    let data = collection;

    if (!isNullOrUndefined(id) && id !== '') {
      data = this.findById(collection, id);
    } else if (query) {
      data = this.applyQuery(collection, query);
    }

    if (!data) {
      return createErrorResponseOptions(
        url, STATUS.NOT_FOUND, `'${collectionName}' with id='${id}' not found`);
    }

    return {
      body: data,
      // TODO: headers
      status: STATUS.OK,
    };
  }

  /**
   * Find first instance of item in collection by `item.id`
   */
  protected findById<T extends { id: RecordId }>(collection: T[], id: RecordId): T {
    return collection.find((item: T) => item.id === id);
  }

  /**
   * Apply query/search parameters as a filter over the collection
   * This impl only supports RegExp queries on string properties of the collection
   * ANDs the conditions together
   */
  protected applyQuery<T extends {
    [key: string]: any,
  }>(collection: T[], query: Map<string, string[]>): T[] {
    // extract filtering conditions - {propertyName, RegExps} - from query/search parameters
    const conditions: { name: string, rx: RegExp }[] = [];
    const caseSensitive = null;
    query.forEach((value: string[], name: string) => {
      value.forEach(v => {
        conditions.push({ name, rx: new RegExp(decodeURI(v), caseSensitive) });
      });
    });
    const len = conditions.length;
    if (!len) { return collection; }
    // AND the RegExp conditions
    return collection.filter(record => {
      let ok = true;
      let i = len;
      while (ok && i) {
        i -= 1;
        const condition = conditions[i];
        ok = condition.rx.test(record[condition.name]);
      }
      return ok;
    });
  }

}
