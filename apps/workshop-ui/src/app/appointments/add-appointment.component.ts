import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Appointment } from '@my-workspace/api-interfaces';
import { AppointmentsService } from '../appointments.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'workshop-add-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <h2>{{ isEditMode ? 'Edit Appointment' : 'Add New Appointment' }}</h2>
      <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()">
        <div class="form-field">
          <label>Assignment:</label>
          <input formControlName="assignment" required>
        </div>
        <div class="form-field">
          <label>Branch:</label>
          <select formControlName="branch" required>
            <option value="">Select a Branch</option>
            <option value="Berlin">Berlin</option>
            <option value="Dortmund">Dortmund</option>
          </select>
        </div>
        <div class="form-field">
          <label>Vehicle Owner:</label>
          <input formControlName="vehicleOwner" required>
        </div>
        <div class="form-field">
          <label>Vehicle Reg No:</label>
          <input formControlName="vehicleRegNo" required>
        </div>
        <div class="form-field">
          <label>Status:</label>
          <input formControlName="status" required>
        </div>
        <div class="form-field">
          <label>Date:</label>
          <input formControlName="date" type="date" required>
        </div>
        <div class="form-field">
          <label>Time:</label>
          <input formControlName="time" type="time" required>
        </div>
        <div class="form-actions">
          <button type="submit" class="submit-button" [disabled]="!appointmentForm.valid">{{ isEditMode ? 'Update' : 'Save' }}</button>
        </div>
      </form>
    </div>
  `,
  styleUrls: ['./add-appointment.component.css']
})
export class AddAppointmentComponent implements OnInit {
  appointmentForm: FormGroup;
  isEditMode = false;
  appointmentId: number | null = null;

  constructor(
    private fb: FormBuilder,
    private appointmentsService: AppointmentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.appointmentForm = this.fb.group({
      assignment: ['', Validators.required],
      branch: ['', Validators.required],
      vehicleOwner: ['', Validators.required],
      vehicleRegNo: ['', Validators.required],
      status: ['', Validators.required],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Check if there's an `id` parameter to determine if we're in edit mode
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      if (id) {
        this.isEditMode = true;
        this.appointmentId = +id;
        this.loadAppointment(this.appointmentId);
      }
    });
  }

  // Load existing appointment data if in edit mode
  loadAppointment(id: number): void {
    this.appointmentsService.getById(id).subscribe(appointment => {
      this.appointmentForm.patchValue(appointment);
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointmentData: Appointment = {
        ...this.appointmentForm.value,
      };

      if (this.isEditMode && this.appointmentId) {
        // Update existing appointment
        this.appointmentsService.updateAppointment(this.appointmentId, appointmentData).subscribe({
          next: () => this.router.navigate(['/appointments']),
          error: (error) => console.error('Error updating appointment:', error)
        });
      } else {
        // Create new appointment
        this.appointmentsService.createAppointment(appointmentData).subscribe({
          next: () => this.router.navigate(['/appointments']),
          error: (error) => console.error('Error creating appointment:', error)
        });
      }
    }
  }
}