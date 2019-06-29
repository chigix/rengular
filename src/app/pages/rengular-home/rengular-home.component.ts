import * as jsonld from 'jsonld';
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { catchError, concatMap, filter, map, tap } from 'rxjs/operators';

@Component({
  selector: 'app-rengular-home',
  templateUrl: './rengular-home.component.html',
  styleUrls: ['./rengular-home.component.scss']
})
export class RengularHomeComponent implements OnInit {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  errorMsg: string;
  private inputSubject = new BehaviorSubject<string>(null);
  isInRequest = false;
  isRequestError = false;
  inputIRI = '';
  registeredIRI = ['simple-quest'];
  snapshot = {
    entryConfig: null as {
      contextName: string,
      contextTitle: string,
      entryScene: string,
      version: string,
    },
    entryIRI: null as string,
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    const inputIRI$ = this.inputSubject.pipe(
      tap(_ => this.snapshot.entryIRI = null),
      tap(_ => this.errorMsg = null),
      map(str => (str && str.trim().length > 0) ? str.trim() : null),
    );
    inputIRI$.pipe(filter(str => !str)).subscribe(_ => {
      this.isRequestError = false;
    });
    inputIRI$.pipe(filter(str => !!str),
      tap(_ => this.isInRequest = true),
      map(str => {
        return ['http://', 'https://']
          .findIndex(scheme => str.indexOf(scheme) === 0) >= 0 ?
          str : `/renpi/maru-quest/context/${str}`;
      }),
      concatMap(url => this.http.get(url).pipe(
        catchError(err => {
          this.isRequestError = true;
          return of(null);
        }),
        map(async doc => {
          if (!doc) { return null; }
          const docExpanded = await jsonld.flatten(doc, {});
          if (docExpanded['@graph'] && docExpanded['@graph'][0]) {
            const docFlatten = docExpanded['@graph'][0];
            if (!docFlatten['http://rengular.js.org/schema/contextName']) {
              this.errorMsg = 'contextName is not configured';
            } else if (!docFlatten['http://rengular.js.org/schema/contextTitle']) {
              this.errorMsg = 'contextTitle is not configured';
            } else if (!docFlatten['http://rengular.js.org/schema/nextScene']) {
              this.errorMsg = 'entryScene is not configured';
            } else {
              this.snapshot.entryIRI = url;
              this.isRequestError = false;
              this.snapshot.entryConfig = {
                contextName: docFlatten['http://rengular.js.org/schema/contextName'],
                contextTitle: docFlatten['http://rengular.js.org/schema/contextTitle'],
                entryScene: docFlatten['http://rengular.js.org/schema/nextScene'],
                version: docFlatten['http://schema.org/version'],
              };
              return doc;
            }
          } else {
            this.isRequestError = true;
            this.errorMsg = 'Invalid JSONLD Document';
          }
          return null;
        }),
      )),
    ).subscribe(_ => this.isInRequest = false);
  }

  entryChanged(value: string) {
    this.inputIRI = value;
    this.inputSubject.next(value);
  }

}
