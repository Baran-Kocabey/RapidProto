import { Injectable } from '@nestjs/common';
import { Appointment } from '@my-workspace/api-interfaces';
import { isTimeInInterval } from "shared/src/lib/shared";
import { openingHoursPerBranch } from "../branches/branches.controller";
import { InjectRepository } from "@nestjs/typeorm";
import { AppointmentsEntity } from "./appointments.entity";
import { Repository } from "typeorm";

@Injectable()
export class AppointmentsService {
  constructor(@InjectRepository(AppointmentsEntity) private readonly appointmentsRepo: Repository<Appointment>) {
  }

  async getAll(): Promise<Appointment[]> {
    return this.appointmentsRepo.find()
  }

  async getById(id: number): Promise<Appointment | null> {
    return this.appointmentsRepo.findOne({where: {id}})
  }

  async updateAppointment(id: number, appointment: Partial<Appointment>): Promise<Appointment> {
    const candidate = await this.getById(id);

    if (candidate === null) {
      throw new Error(`no appointment with id ${id} found.`);
    }

    const patchedAppointment: Appointment = {...candidate, ...appointment};
    const start = openingHoursPerBranch[patchedAppointment.branch].openingHoursStart;
    const end = openingHoursPerBranch[patchedAppointment.branch].openingHoursEnd;

    if (false === isTimeInInterval(patchedAppointment.time, start, end)) {
      throw new Error(`Um ${patchedAppointment.time}Uhr ist unsere Werkstatt geschlossen (${start} - ${end})`);
    }
    await this.appointmentsRepo.save(patchedAppointment)
    return patchedAppointment;
  }

  async createAppointment(appointment: Appointment): Promise<Appointment> {
    const start = openingHoursPerBranch[appointment.branch].openingHoursStart;
    const end = openingHoursPerBranch[appointment.branch].openingHoursEnd;

    if (!isTimeInInterval(appointment.time, start, end)) {
      throw new Error(`Um ${appointment.time}Uhr ist unsere Werkstatt geschlossen (${start} - ${end})`);
    }

    if (!appointment.userId) {
      throw new Error('UserId is required to create an appointment');
    }

    const newAppointment = this.appointmentsRepo.create(appointment);
    return await this.appointmentsRepo.save(newAppointment);
  }

  async deleteAppointment(id: number): Promise<void> {
    const appointment = await this.appointmentsRepo.findOne({ where: { id } });
  
    if (!appointment) {
      throw new Error(`Appointment with ID ${id} not found.`);
    }
  
    await this.appointmentsRepo.remove(appointment);
  }
  
}