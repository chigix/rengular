import { Injectable } from '@angular/core';
import { SimulationServiceBase } from './simulation.service';

@Injectable()
export class GekijoProgramService {

  constructor(
    private simulationService: SimulationServiceBase,
  ) { }
}
