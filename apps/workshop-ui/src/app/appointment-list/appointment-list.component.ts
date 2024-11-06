import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentsService } from "../appointments.service";
import { Appointment } from '@my-workspace/api-interfaces';
import { Observable } from "rxjs";
import { RouterLink, Router } from "@angular/router";
import { AuthService } from '../core/auth/auth.service';

@Component({
  selector: 'workshop-appointment-list',
  standalone: true,
  imports: [CommonModule, RouterLink],
  template: `
  <div class="list-container">
    <h2>Appointments</h2>
    <ul>
      <li *ngFor="let appointment of appointments$ | async" class="appointment-item">
        <span class="appointment-details">{{ appointment.vehicleOwner }} - {{ appointment.branch }}</span>
        <div class="button-group">
          <button *ngIf="appointment?.id && authService.canEditOrDelete(appointment.userId!)" 
                  (click)="editAppointment(appointment.id!)"
                  class="icon-button edit-button">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75l11.09-11.09-3.75-3.75L3 17.25zm17.71-10.04c.39-.39.39-1.02 0-1.41l-2.54-2.54c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"/>
            </svg>
          </button>
          <button *ngIf="appointment?.id && authService.canEditOrDelete(appointment.userId!)" 
                  (click)="deleteAppointment(appointment.id!)"
                  class="icon-button delete-button">
            <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 6h18v2H3V6zm3 4h12v12H6V10zm3-8h6v2H9V2zm2 4v12h2V6h-2z"/>
            </svg>
          </button>
        </div>
      </li>
    </ul>
    <button routerLink="/add-appointment" class="add-button">Add New Appointment</button>
  </div>
  `,
  styleUrls: ['./appointment-list.component.css']
})
export class AppointmentListComponent {
  appointments$!: Observable<Appointment[]>;

  constructor(
    private readonly appointmentsService: AppointmentsService,
    private router: Router,
    public authService: AuthService,
  ) {}

  ngOnInit(): void {
    this.appointments$ = this.appointmentsService.getAll();
  }

  canEditOrDelete(userId: number): boolean {
    return this.authService.isAdmin() || this.authService.getCurrentUser()?.id === userId;
  }

  loadAppointments(): void {
    this.appointments$ = this.appointmentsService.getAll();
  }


  editAppointment(id: number) {
    this.router.navigate(['/appointments', id, 'edit']);
    console.log("Editing appointment with ID:", id);
  }

  deleteAppointment(id: number) {
    if (confirm('Are you sure you want to delete this appointment?')) {
      this.appointmentsService.deleteAppointment(id).subscribe(
        () => {
          console.log("Deleted appointment with ID:", id);
          this.loadAppointments(); 
        },
        (error) => {
          console.error("Error deleting appointment:", error);
        }
      );
    }
  }
  
}
