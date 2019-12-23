import { ContextDirective } from '@rengular/network-context';

export interface GekijoDirective extends ContextDirective {
  '@type': 'http://rengular.js.org/schema/GekijoAction';
  delay?: number;
  [property: string]: any;
}
