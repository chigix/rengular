import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Scene, SimulationContext } from 'app/renpi';

const context: SimulationContext[] = [{
  id: '1',
  name: 'maru-quest',
  title: 'RenGULAR DEMO Script: Maru Quest',
  version: '1.0.0',
  interfaceVersion: 1,
  entryScene: '/renpi/maru-quest/scene/1',
}];

const scene: Scene[] = [
  { id: '1', component: 'simpleEntry' },
  { id: '2', component: 'simpleEntry' },
  { id: '3', component: 'simpleEntry' },
  { id: '4', component: 'simpleEntry' },
  { id: '5', component: 'simpleEntry' },
];

@Injectable({
  providedIn: 'root'
})
export class MaruQuestScriptDB implements InMemoryDbService {
  createDb() {
    return {
      context,
      scene,
    };
  }

}
