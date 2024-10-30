import { Route } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDetailRouteComponent } from './appointment-detail-route/appointment-detail-route.component';
import { AddAppointmentComponent } from './appointments/add-appointment.component';

export const appRoutes: Route[] = [
    {path: 'appointments', component: AppointmentListComponent},
    {path: 'appointments/:id', component: AppointmentDetailRouteComponent},
    { path: 'add-appointment', component: AddAppointmentComponent },
    { path: 'appointments/:id/edit', component: AddAppointmentComponent }
];