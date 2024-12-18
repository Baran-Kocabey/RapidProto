export interface Appointment {
  id?: number;
  assignment: string;
  branch: string;
  vehicleOwner: string;
  vehicleRegNo: string;
  status: string;
  date: string;
  time: string;
  userId?: number;
}

export interface OpeningHours {
  openingHoursStart: string;
  openingHoursEnd: string;
}

export interface OpeningHoursPerBranch {
  [key: string]: OpeningHours;
}

export function apiInterfaces() {
  return 'api-interfaces';
}