import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  ComponentsRegistryService, NetworkContextService,
} from '@rengular/network-context';

import { SimulationOutletComponent } from './simulation-outlet.component';
import { DefaultSimulationService } from '../default-simulation.service';
import { SimulationService } from '../../simulation.service';

async function setup() {
  TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      ComponentsRegistryService, NetworkContextService,
      { provide: SimulationService, useClass: DefaultSimulationService }
    ],
    declarations: [SimulationOutletComponent],
  });
  await TestBed.compileComponents();
  const fixture = TestBed.createComponent(SimulationOutletComponent);
  const component = fixture.componentInstance;
  return { fixture, component };
}

describe('SimulationOutletComponent', () => {

  it('should create', async () => {
    const { fixture, component } = await setup();
    fixture.detectChanges();
    expect(component).toBeTruthy();
  });
});
