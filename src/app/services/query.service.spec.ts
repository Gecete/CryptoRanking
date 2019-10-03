import { TestBed, inject } from '@angular/core/testing';

import { QueryService } from './query.service';
import { HttpClient, HttpHandler } from '@angular/common/http';

describe('QueryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [QueryService, HttpClient, HttpHandler]
    });
  });

  it('should be created', inject([QueryService], (service: QueryService) => {
    expect(service).toBeTruthy();
  }));
});
