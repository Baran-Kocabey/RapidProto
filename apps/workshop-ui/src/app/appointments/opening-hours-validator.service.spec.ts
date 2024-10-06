import { TestBed } from '@angular/core/testing';

import { OpeningHoursValidatorService } from './opening-hours-validator.service';
import { provideAutoSpy } from "jest-auto-spies";
import { AppointmentsService } from "../appointments.service";

describe('OpeningHoursValidatorService', () => {
  let service: OpeningHoursValidatorService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideAutoSpy(AppointmentsService)]
    });
    service = TestBed.inject(OpeningHoursValidatorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
