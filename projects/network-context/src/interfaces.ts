import { Type } from '@angular/core';

export type TypeIRI = string;
export type PropertyIRI = string;
export type PropertyName = string;

export interface ComponentMeta<T> {
  typeIRI?: string;
  component: Type<T>;
  isScene?: boolean;
  inputs: {
    [propertyIRI: string]: PropertyName | ((component: T, value: any) => void),
  };
  children: {
    [propertyIRI: string]: PropertyName,
  };
}
