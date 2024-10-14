import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class appointmentDate1679331729209 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    const appointmentsTable = await queryRunner.getTable('appointments_entity');
    if (appointmentsTable) {
      await queryRunner.addColumn(
        appointmentsTable,
        new TableColumn({
          name: 'date_and_time',
          type: 'date',
          isNullable: true,
        })
      );
    }
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const appointmentsTable = await queryRunner.getTable('appointments_entity');
    if (appointmentsTable) {
      await queryRunner.dropColumn(appointmentsTable, 'date_and_time');
    }
  }
}