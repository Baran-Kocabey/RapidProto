import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Appointment } from '@my-workspace/api-interfaces';
import { OpeningHoursValidatorService } from '../appointments/opening-hours-validator.service';

@Component({
  selector: 'workshop-appointment-detail-view',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="card">
      <h2>Appointment Details</h2>
      <form [formGroup]="form" (ngSubmit)="save()">
        <div class="form-group">
          <label for="vehicleOwner">Owner</label>
          <input
            id="vehicleOwner"
            type="text"
            formControlName="vehicleOwner"
            class="form-control"
          />
          <span class="error" *ngIf="form.controls['vehicleOwner'].invalid"
            >Please provide an owner</span
          >
        </div>

        <div class="form-group">
          <label for="date">Date</label>
          <input
            id="date"
            type="date"
            formControlName="date"
            class="form-control"
          />
          <span class="error" *ngIf="form.controls['date'].invalid"
            >Please provide a valid date</span
          >
        </div>

        <div class="form-group">
          <label for="time">Time</label>
          <input
            id="time"
            type="time"
            formControlName="time"
            class="form-control"
          />
          <span class="error" *ngIf="form.controls['time'].invalid"
            >Please provide a valid time</span
          >
        </div>

        <div class="form-group">
          <label for="vehicleRegNo">Registration No</label>
          <input
            id="vehicleRegNo"
            type="text"
            formControlName="vehicleRegNo"
            class="form-control"
          />
          <span class="error" *ngIf="form.controls['vehicleRegNo'].invalid"
            >Please provide a registration number</span
          >
        </div>

        <div class="form-group">
          <label for="assignment">Assignment</label>
          <select
            id="Assignment"
            formControlName="assignment"
            class="form-control"
          >
            <option value="">Select a Assignment</option>
            <option value="Motorwartung">Motorwartung</option>
            <option value="Karosseriearbeiten">Karosseriearbeiten</option>
            <option value="Lackierung">Lackierung</option>
            <option value="Elektrik">Elektrik</option>
            <option value="Spurvermessung">Spurvermessung</option>
            <option value="Sonstiges">Sonstiges</option>
          </select>
          <span class="error" *ngIf="form.controls['branch'].invalid"
            >Please select a branch</span
          >
        </div>

        <div class="form-group">
          <label for="branch">Branch</label>
          <select id="branch" formControlName="branch" class="form-control">
            <option value="Dortmund">Dortmund</option>
            <option value="Berlin">Berlin</option>
          </select>
          <span class="error" *ngIf="form.controls['branch'].invalid"
            >Please select a branch</span
          >
        </div>

        <div class="form-group">
          <label for="status">Status</label>
          <select id="status" formControlName="status" class="form-control">
            <option value="">Select a status</option>
            <option value="In Bearbeitung">In Bearbeitung</option>
            <option value="Ausstehend">Ausstehend</option>
            <option value="Abgeschlossen">Abgeschlossen</option>
          </select>
        </div>

        <button type="submit" class="btn btn-primary" [disabled]="form.invalid">
          Save
        </button>
      </form>
    </div>
  `,
  styles: [
    `
      .appointment-form {
        max-width: 500px;
        margin: 20px auto;
        padding: 20px;
        border: 1px solid #ccc;
        border-radius: 8px;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        background-color: #f9f9f9;
      }

      h2 {
        text-align: center;
        margin-bottom: 20px;
        color: #333;
      }

      .form-group {
        margin-bottom: 15px;
      }

      label {
        display: block;
        margin-bottom: 5px;
        font-weight: bold;
        color: #555;
      }

      .form-control {
        width: 100%;
        padding: 10px;
        border: 1px solid #ccc;
        border-radius: 4px;
        box-sizing: border-box;
        transition: border-color 0.3s;
      }

      .form-control:focus {
        border-color: #66afe9;
        outline: none;
      }

      .submit-button {
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 16px;
        transition: background-color 0.3s;
      }

      .submit-button:hover {
        background-color: #0056b3;
      }
    `,
  ],
})
export class AppointmentDetailViewComponent {
  @Input() appointment!: Appointment
  @Output() appointmentSave = new EventEmitter<Partial<Appointment>>()

  form: FormGroup;

  constructor(private readonly openingHoursValidatorService: OpeningHoursValidatorService) {
    this.form = new FormGroup({
      vehicleOwner: new FormControl('', {validators: Validators.required, nonNullable: true}),
      date: new FormControl('', {validators: Validators.required, nonNullable: true}),
      time: new FormControl('', {validators: Validators.required, nonNullable: true}),
      vehicleRegNo: new FormControl('', {validators: Validators.required, nonNullable: true}),
      branch: new FormControl<string>('', {validators: Validators.required, nonNullable: true}),
      status: new FormControl('', {nonNullable: true}),
    }, {asyncValidators: [this.openingHoursValidatorService.openingHoursValidator('time', 'branch'),]});
  }

  ngOnChanges(): void {
    if (this.appointment != null) {
      this.form.patchValue(this.appointment)
    }
  }

  save() {
    if (this.form.valid) {
      this.appointmentSave.emit(this.form.value);
    } else {
      alert('Form is invalid. Please correct the errors.');
    }
  }
  
}