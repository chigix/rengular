import { TypeIRI, ComponentMeta } from '../interfaces';

export interface ContextDirective {
  '@type': string;
  finish: () => void;
}

export class ComponentMetaConfigDirective implements ContextDirective {
  '@type' = 'http://rengular.js.org/schema/StaticSessionAction';
  finish: () => void;
  constructor(
    public targetType: TypeIRI,
    public property: string,
    public value: any,
  ) { }
}

export interface NewComponentDirective extends ContextDirective {
  '@type': 'http://rengular.js.org/schema/ComponentAction';
  meta: ComponentMeta<{}>;
  componentId: string;
}
