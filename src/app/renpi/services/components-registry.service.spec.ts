import { TestBed } from '@angular/core/testing';

import { ComponentsRegistryService } from './components-registry.service';

describe('ComponentsRegistryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ComponentsRegistryService = TestBed.get(ComponentsRegistryService);
    expect(service).toBeTruthy();
  });
});
