import { ContextDirective } from '@rengular/network-context';
import * as SHM from './schema-iris';

export interface GekijoDirective extends ContextDirective {
  '@type': typeof SHM.GEKIJO_ACTION_TYPE;
  delay?: number;
  [property: string]: any;
}
