import { TestBed } from '@angular/core/testing';

import { NetworkContextService } from './network-context.service';

describe('NetworkContextService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NetworkContextService = TestBed.get(NetworkContextService);
    expect(service).toBeTruthy();
  });
});
