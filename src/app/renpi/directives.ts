import { ComponentDirective } from './defs';
import { ComponentMeta } from './services';

export type TypeIRI = string;

export interface NewComponentDirective extends ComponentDirective {
  '@type': 'http://rengular.js.org/schema/ComponentAction';
  meta: ComponentMeta<{}>;
  componentId: string;
}

export interface GekijoDirective extends ComponentDirective {
  '@type': 'http://rengular.js.org/schema/GekijoAction';
  delay?: number;
  [property: string]: any;
}

export class StaticSessionDirective implements ComponentDirective {
  '@type' = 'http://rengular.js.org/schema/StaticSessionAction';
  finish: () => void;

  constructor(
    public targetType: TypeIRI,
    public property: string,
    public value: any,
  ) {
  }

}
