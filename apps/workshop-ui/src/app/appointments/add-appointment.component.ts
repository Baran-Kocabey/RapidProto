import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Appointment } from '@my-workspace/api-interfaces';
import { AppointmentsService } from '../appointments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'workshop-add-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="form-container">
      <div class="mb-2">
        <a class="back-link" (click)="goToList()">Back to list</a>
      </div>
      
      <h2>{{ isEditMode ? 'Edit Appointment' : 'Add New Appointment' }}</h2>
      <form [formGroup]="appointmentForm" (ngSubmit)="onSubmit()">
         <div class="form-field">
          <label>Assignment:</label>
          <select formControlName="assignment" required>
            <option value="">Select a Assignment</option>
            <option value="Motorwartung">Motorwartung</option>
            <option value="Karosseriearbeiten">Karosseriearbeiten</option>
            <option value="Lackierung">Lackierung</option>
            <option value="Elektrik">Elektrik</option>
            <option value="Spurvermessung">Spurvermessung</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
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
          <select formControlName="status" required>
            <option value="">Select a status</option>
            <option value="In Bearbeitung">In Bearbeitung</option>
            <option value="Ausstehend">Ausstehend</option>
            <option value="Abgeschlossen">Abgeschlossen</option>
          </select>
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
    private authService: AuthService,
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

  goToList(): void {
    this.router.navigate(['/appointments']); 
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const currentUser = this.authService.getCurrentUser();
      const appointmentData: Appointment = {
        ...this.appointmentForm.value,
        userId: currentUser?.id
      };
  
      if (this.isEditMode && this.appointmentId) {
        // Update existing appointment
        this.appointmentsService.updateAppointment(this.appointmentId, appointmentData).subscribe({
          next: () => this.router.navigate(['/appointments']),
          error: (error) => {
            console.error('Error updating appointment:', error);
            this.showErrorAlert(error.error.message); // Show alert on error
          }
        });
      } else {
        // Create new appointment
        this.appointmentsService.createAppointment(appointmentData).subscribe({
          next: () => this.router.navigate(['/appointments']),
          error: (error) => {
            console.error('Error creating appointment:', error);
            this.showErrorAlert(error.error.message); // Show alert on error
          }
        });
      }
    }
  }
  
  showErrorAlert(message: string): void {
    alert(`Error: ${message}`);
  }
  
}
