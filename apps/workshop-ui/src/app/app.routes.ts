import { Route } from '@angular/router';
import { AppointmentListComponent } from './appointment-list/appointment-list.component';
import { AppointmentDetailRouteComponent } from './appointment-detail-route/appointment-detail-route.component';

export const appRoutes: Route[] = [
    {path: 'appointments', component: AppointmentListComponent},
    {path: 'appointments/:id', component: AppointmentDetailRouteComponent}
    
];