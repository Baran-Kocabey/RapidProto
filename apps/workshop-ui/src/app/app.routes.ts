import { Route } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDetailRouteComponent } from './appointment-detail-route/appointment-detail-route.component';
import { AddAppointmentComponent } from './appointments/add-appointment.component';
import { LoginComponent } from './core/auth/login/login.component';
import { AuthGuard } from './core/auth/auth.guard';

export const appRoutes: Route[] = [
  { path: 'login', component: LoginComponent },
  { path: 'appointments', component: AppointmentListComponent, canActivate: [AuthGuard] },
  { path: 'appointments/:id/edit', component: AppointmentDetailRouteComponent, canActivate: [AuthGuard] },
  { path: 'add-appointment', component: AddAppointmentComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Default route to login
];
