import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentsRegistryService, NetworkContextService,
} from '@rengular/network-context';

import { DefaultSimulationService } from './default-simulation.service';
import { SimulationService } from '../simulation.service';

function setup() {
  TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      ComponentsRegistryService, NetworkContextService,
      { provide: SimulationService, useClass: DefaultSimulationService }
    ],
  });
  const service: DefaultSimulationService = TestBed.get(SimulationService);
  return { service };
}

describe('DefaultSimulationService', () => {

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });
});
