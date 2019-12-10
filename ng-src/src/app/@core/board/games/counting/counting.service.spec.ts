/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CountingService } from './counting.service';

describe('Service: Counting', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CountingService]
    });
  });

  it('should ...', inject([CountingService], (service: CountingService) => {
    expect(service).toBeTruthy();
  }));
});
