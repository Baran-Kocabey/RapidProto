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
      <li *ngFor="let appointment of appointments$ | async">
        <span>{{ appointment.vehicleOwner }} - {{ appointment.branch }}</span>
        <button *ngIf="appointment?.id && authService.canEditOrDelete(appointment.userId!)" 
        (click)="editAppointment(appointment.id!)">
        Edit
      </button>
      <button *ngIf="appointment?.id && authService.canEditOrDelete(appointment.userId!)" 
              (click)="deleteAppointment(appointment.id!)">
        Delete
      </button>

      </li>
    </ul>
    <button routerLink="/add-appointment">Add New Appointment</button>
  </div>
`,
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
