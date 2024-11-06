import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Appointment } from '@my-workspace/api-interfaces';
import { ActivatedRoute, RouterLink, Router } from "@angular/router";
import { firstValueFrom, map, Observable, switchMap, tap } from "rxjs";
import { AppointmentsService } from "../appointments.service";
import { AppointmentDetailViewComponent } from "../appointment-detail-view/appointment-detail-view.component";

@Component({
  selector: 'workshop-appointment-detail-route',
  standalone: true,
  imports: [CommonModule, RouterLink, AppointmentDetailViewComponent],
  template: `
    <div class="detail-container">
      <div class="mb-2">
        <a class="back-link" (click)="goToList()">Back to list</a>
      </div>
      <workshop-appointment-detail-view
        [appointment]="appointment"
        (appointmentSave)="save($event)"
        *ngIf="appointment$ | async as appointment">
      </workshop-appointment-detail-view>
    </div>
  `,
  styleUrls: ['./appointment-detail-route.component.css'],
})
export class AppointmentDetailRouteComponent {
  appointment$!: Observable<Appointment>;
  actualId = -1;

  constructor(
    private readonly activatedRoute: ActivatedRoute,
    private readonly appointmentsService: AppointmentsService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.appointment$ = this.activatedRoute.params.pipe(
      map(params => Number(params['id'])),
      tap(id => this.actualId = id),
      switchMap(id => this.appointmentsService.getById(id))
    );
  }

  async save(appointment: Partial<Appointment>) {
    await firstValueFrom(
      this.appointmentsService.updateAppointment(this.actualId, appointment)
    );
    this.goToList(); // Redirect to the list after saving
  }

  goToList(): void {
    this.router.navigate(['/appointments']); 
  }
}
