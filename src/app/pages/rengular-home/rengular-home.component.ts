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
  isRequestValid = false;
  entryIRI = '';
  registeredIRI = ['simple-quest'];
  snapshot = {
    entryConfig: null as {
      contextName: string,
      contextTitle: string,
      entryScene: string,
      version: string,
    },
  };

  constructor(
    private breakpointObserver: BreakpointObserver,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.inputSubject.pipe(
      tap(_ => this.isRequestValid = false),
      filter(str => !!str),
      map(str => str.trim().length > 0 ? str.trim() : null),
      filter(str => !!str),
      tap(_ => this.isInRequest = true),
      map(str => {
        return ['http://', 'https://']
          .findIndex(scheme => str.indexOf(scheme) === 0) >= 0 ?
          str : `/renpi/maru-quest/context/${str}`;
      }),
      tap(url => this.entryIRI = url),
      concatMap(url => this.http.get(url).pipe(
        catchError(err => {
          this.isRequestError = true;
          this.isRequestValid = false;
          return of(null);
        }))),
    ).subscribe(async doc => {
      if (!doc) { return; }
      this.isInRequest = false;
      this.isRequestError = false;
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
          this.isRequestError = false;
          this.isRequestValid = true;
          this.snapshot.entryConfig = {
            contextName: docFlatten['http://rengular.js.org/schema/contextName'],
            contextTitle: docFlatten['http://rengular.js.org/schema/contextTitle'],
            entryScene: docFlatten['http://rengular.js.org/schema/nextScene'],
            version: docFlatten['http://schema.org/version'],
          };
        }
      } else {
        this.isRequestError = true;
        this.isRequestValid = false;
        this.errorMsg = 'Invalid JSONLD Document';
      }
    });
  }

  entryChanged(value: string) {
    this.entryIRI = value;
    this.inputSubject.next(value);
  }

}
