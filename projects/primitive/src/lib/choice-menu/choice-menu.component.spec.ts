import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatButtonModule, MatCardModule, MatGridListModule } from '@angular/material';
import {
  ComponentsRegistryService, NetworkContextService,
} from '@rengular/network-context';
import { SimulationService, DefaultSimulationService } from '@rengular/simulation';

import { ChoiceMenuComponent } from './choice-menu.component';

async function setup() {
  TestBed.configureTestingModule({
    imports: [HttpClientTestingModule, MatButtonModule, MatCardModule, MatGridListModule],
    providers: [
      ComponentsRegistryService, NetworkContextService,
      { provide: SimulationService, useClass: DefaultSimulationService }
    ],
    declarations: [ChoiceMenuComponent],
  });
  await TestBed.compileComponents();
  const fixture = TestBed.createComponent(ChoiceMenuComponent);
  const component = fixture.componentInstance;
  return { fixture, component };
}

describe('ChoiceMenuComponent', () => {

  it('should create', async () => {
    const { component } = await setup();
    expect(component).toBeTruthy();
  });
});
