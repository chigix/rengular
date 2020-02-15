import { TestBed } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { ComponentsRegistryService } from '@rengular/network-context';

import { NetworkContextService } from './network-context.service';

function setup() {
  TestBed.configureTestingModule({
    imports: [HttpClientModule],
    providers: [
      ComponentsRegistryService, NetworkContextService,
    ],
  });
  const service: NetworkContextService = TestBed.get(NetworkContextService);
  return { service };
}

describe('NetworkContextService', () => {

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });
});
