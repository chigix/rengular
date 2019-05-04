import { TestBed } from '@angular/core/testing';

import { GekijoProgramService } from './gekijo-program.service';

describe('GekijoProgramService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GekijoProgramService = TestBed.get(GekijoProgramService);
    expect(service).toBeTruthy();
  });
});
