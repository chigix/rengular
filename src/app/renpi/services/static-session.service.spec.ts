import { TestBed } from '@angular/core/testing';

import { StaticSessionService } from './static-session.service';

describe('StaticSessionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StaticSessionService = TestBed.get(StaticSessionService);
    expect(service).toBeTruthy();
  });
});
