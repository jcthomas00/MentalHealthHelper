import { TestBed } from '@angular/core/testing';

import { AnalyzeMoodService } from './analyze-mood.service';

describe('AnalyzeMoodService', () => {
  let service: AnalyzeMoodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnalyzeMoodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
