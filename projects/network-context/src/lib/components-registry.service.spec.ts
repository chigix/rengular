import { TestBed } from '@angular/core/testing';

import { ComponentsRegistryService } from './components-registry.service';

function setup() {
  TestBed.configureTestingModule({
    providers: [ComponentsRegistryService],
  });
  const service: ComponentsRegistryService = TestBed.get(ComponentsRegistryService);
  return { service };
}

describe('ComponentsRegistryService', () => {

  it('should be created', () => {
    const { service } = setup();
    expect(service).toBeTruthy();
  });
});
