import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import {
  ComponentsRegistryService, NetworkContextService,
} from '@rengular/network-context';
import { SimulationService, DefaultSimulationService } from '@rengular/simulation';

import { MatListModule } from '@angular/material';
import { OarsPocketComponent } from './oars-pocket.component';

async function setup() {
  TestBed.configureTestingModule({
    imports: [MatListModule, HttpClientTestingModule],
    providers: [
      ComponentsRegistryService, NetworkContextService,
      { provide: SimulationService, useClass: DefaultSimulationService }
    ],
    declarations: [OarsPocketComponent],
  });
  await TestBed.compileComponents();
  const fixture = TestBed.createComponent(OarsPocketComponent);
  const component = fixture.componentInstance;
  return { fixture, component };
}

describe('OarsPocketComponent', () => {

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
