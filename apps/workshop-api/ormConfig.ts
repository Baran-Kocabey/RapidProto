import { DataSource } from "typeorm";
import { getConfig } from './src/app/config/config';
import { AppointmentsEntity } from './src/app/appointments/appointments.entity';

const config = getConfig();

export default new DataSource({
  type: 'postgres',
  host: config.get('dbHost'),
  port: config.get('dbPort'),
  username: config.get('dbUser'),
  password: config.get('dbPassword'),
  database: config.get('dbName'),
  synchronize: false,
  migrations: ['apps/workshop-api/migration/1728553202141-appointment-date.ts'],
  entities: [AppointmentsEntity]
})
