import { Injectable } from '@angular/core';
import { AppointmentsService } from '../appointments.service';
import { AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { first, switchMap, map } from 'rxjs';


export const timeRegExp = /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/;

@Injectable({
  providedIn: 'root'
})
export class OpeningHoursValidatorService {
  constructor(private readonly appointmentsService: AppointmentsService) {}
  
  openingHoursValidator(timeControlName: string, branchIdControlName: string): AsyncValidatorFn {
    return (group: AbstractControl) => {
      const time = group.get(timeControlName)?.value;
      const branchId = group.get(branchIdControlName)?.value;
      
      // Falls Zeit oder Filial-ID fehlen
      if (!time || !branchId) {
        return Promise.resolve({ openingHours: 'Time or branch ID is missing' });
      }

      // Holen der Öffnungszeiten der Filiale
      return this.appointmentsService.getOpeningHoursPerBranch().pipe(
        first(),
        switchMap((perBranch) => {
          const openingHoursOfBranch = perBranch[branchId];
          if (!openingHoursOfBranch) {
            return Promise.resolve({ openingHours: `No opening hours found for branch: ${branchId}` });
          }

          return isTimeInInterval(time, openingHoursOfBranch.openingHoursStart, openingHoursOfBranch.openingHoursEnd)
            ? Promise.resolve(null)
            : Promise.resolve({
                openingHours: `Time ${time} is not within interval [${openingHoursOfBranch.openingHoursStart}, ${openingHoursOfBranch.openingHoursEnd}]`,
              });
        })
      );
    };
  }
}

// Validierungsfunktion für Zeitintervalle
function isTimeInInterval(time: string, start: string, end: string): boolean {
  const allInCorrectFormat = timeRegExp.test(time) && timeRegExp.test(start) && timeRegExp.test(end);
  
  // Falls Format nicht korrekt ist, gib false zurück
  if (!allInCorrectFormat) {
    return false;
  }
  
  // Zeiten in Date-Objekte konvertieren, um Vergleich zu vereinfachen
  const [timeHours, timeMinutes] = time.split(':').map(Number);
  const [startHours, startMinutes] = start.split(':').map(Number);
  const [endHours, endMinutes] = end.split(':').map(Number);

  const timeDate = new Date();
  const startDate = new Date();
  const endDate = new Date();

  timeDate.setHours(timeHours, timeMinutes, 0, 0);
  startDate.setHours(startHours, startMinutes, 0, 0);
  endDate.setHours(endHours, endMinutes, 0, 0);

  return timeDate >= startDate && timeDate <= endDate;
}