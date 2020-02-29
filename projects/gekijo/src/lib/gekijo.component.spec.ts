import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentsRegistryService, NetworkContextService,
} from '@rengular/network-context';
import { SimulationService, DefaultSimulationService } from '@rengular/simulation';

import { GekijoComponent } from './gekijo.component';

async function setup() {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule],
    providers: [
      ComponentsRegistryService, NetworkContextService,
      { provide: SimulationService, useClass: DefaultSimulationService }
    ],
    declarations: [GekijoComponent],
  });
  await TestBed.compileComponents();
  const fixture = TestBed.createComponent(GekijoComponent);
  const component = fixture.componentInstance;
  return { fixture, component };
}

describe('GekijoComponent', () => {

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
