import { TestBed } from '@angular/core/testing';

import { TwitchserviceService } from './twitchservice.service';

describe('TwitchserviceService', () => {
  let service: TwitchserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TwitchserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
