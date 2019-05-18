import { ComponentDirective } from './defs';
import { ComponentMeta } from './services';

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
