import { TestBed } from '@angular/core/testing';

import { DefaultSimulationService } from './default-simulation.service';

describe('SimulationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DefaultSimulationService = TestBed.get(DefaultSimulationService);
    expect(service).toBeTruthy();
  });
});
