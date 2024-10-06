import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailViewComponent } from './appointment-detail-view.component';
import { provideAutoSpy, Spy } from "jest-auto-spies";
import { OpeningHoursValidatorService } from "../appointments/opening-hours-validator.service";

describe('AppointmentDetailViewComponent', () => {
  let component: AppointmentDetailViewComponent;
  let fixture: ComponentFixture<AppointmentDetailViewComponent>;
  let openingHoursValidator: Spy<OpeningHoursValidatorService>

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDetailViewComponent],
      providers: [
        provideAutoSpy(OpeningHoursValidatorService),
      ]
    }).compileComponents();
    openingHoursValidator = TestBed.inject(OpeningHoursValidatorService) as any;
    openingHoursValidator.openingHoursValidator.mockReturnValue(async () => null)
    fixture = TestBed.createComponent(AppointmentDetailViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
