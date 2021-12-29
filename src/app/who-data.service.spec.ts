import { TestBed } from '@angular/core/testing';

import { WhoDataService } from './who-data.service';

describe('WhoDataService', () => {
  let service: WhoDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WhoDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
