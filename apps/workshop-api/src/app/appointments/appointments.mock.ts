import { Appointment } from "@my-workspace/api-interfaces";


export const APPOINTMENTS: Appointment[] = [
  {
    id: 1,
    assignment: 'Motorwartung',
    branch: 'Berlin-Mitte',
    vehicleOwner: 'Max Mustermann',
    vehicleRegNo: 'B-AB-1234',
    status: 'Ausstehend',
    date: '2021-09-01',
    time: '10:00 Uhr',
    userId: 2, // Assign this to user1
  },
  {
    id: 2,
    assignment: 'Karosseriearbeiten',
    branch: 'Hamburg-Altona',
    vehicleOwner: 'Erika Mustermann',
    vehicleRegNo: 'HH-CD-5678',
    status: 'Abgeschlossen',
    date: '2021-09-02',
    time: '11:00 Uhr',
    userId: 3, // Assign this to user2
  },
  {
    id: 3,
    assignment: 'Lackierung',
    branch: 'München-Schwabing',
    vehicleOwner: 'Hans Mustermann',
    vehicleRegNo: 'M-EF-9012',
    status: 'In Bearbeitung',
    date: '2021-09-03',
    time: '12:00 Uhr',
    userId: 1, // Admin owns this appointment
  },
  {
    id: 4,
    assignment: 'Elektrik',
    branch: 'Köln-Ehrenfeld',
    vehicleOwner: 'Anna Mustermann',
    vehicleRegNo: 'K-GH-3456',
    status: 'Ausstehend',
    date: '2021-09-04',
    time: '13:00 Uhr',
    userId: 2,
  },
  {
    id: 5,
    assignment: 'Spurvermessung',
    branch: 'Frankfurt-Sachsenhausen',
    vehicleOwner: 'Klaus Mustermann',
    vehicleRegNo: 'F-IJ-7890',
    status: 'Abgeschlossen',
    date: '2021-09-05',
    time: '14:00 Uhr',
    userId: 3,
  },
];
