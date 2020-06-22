import { TestBed, inject } from '@angular/core/testing';

import { ComplejosService } from './complejos.service';

describe('ComplejosService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ComplejosService]
    });
  });

  it('should be created', inject([ComplejosService], (service: ComplejosService) => {
    expect(service).toBeTruthy();
  }));
});
