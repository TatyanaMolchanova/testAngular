import { TestBed } from '@angular/core/testing';

import { CarOwnersServiceService } from './car-owners.service';

describe('CarOwnersServiceService', () => {
  let service: CarOwnersServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CarOwnersServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
