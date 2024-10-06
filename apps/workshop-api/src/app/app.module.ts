import { Module } from '@nestjs/common';
import { AppointmentsController } from './appointments/appointments.controller';
import { AppointmentsService } from './appointments/appointments.service';
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppointmentsEntity } from './appointments/appointments.entity';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: 'Password1!',
    database: 'workshop-db',
    autoLoadEntities: true,
    synchronize: true,
  }),
    TypeOrmModule.forFeature([AppointmentsEntity]),
  ],
  controllers: [AppointmentsController],
  providers: [AppointmentsService],
})
export class AppModule {}
