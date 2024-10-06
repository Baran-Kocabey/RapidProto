import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentDetailRouteComponent } from './appointment-detail-route.component';
import { RouterTestingModule } from "@angular/router/testing";
import { provideAutoSpy } from "jest-auto-spies";
import { AppointmentsService } from "../appointments.service";

describe('AppointmentDetailRouteComponent', () => {
  let component: AppointmentDetailRouteComponent;
  let fixture: ComponentFixture<AppointmentDetailRouteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentDetailRouteComponent, RouterTestingModule],
      providers: [provideAutoSpy(AppointmentsService)]
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentDetailRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
