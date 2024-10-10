import { MigrationInterface, QueryRunner, TableColumn } from "typeorm"

export class appointmentDate1679331729209 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        const appointmentsTable = await queryRunner.getTable('appointments_entity');
        
        if (appointmentsTable) {
            await queryRunner.addColumn('appointments_entity', new TableColumn({
                name: 'date_and_time',
                type: 'date',
                isNullable: true
            }));
        } else {
            throw new Error("Table 'appointments_entity' does not exist.");
        }
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const appointmentsTable = await queryRunner.getTable('appointments_entity');

        if (appointmentsTable) {
            await queryRunner.dropColumn('appointments_entity', 'date_and_time');
        } else {
            throw new Error("Table 'appointments_entity' does not exist.");
        }
    }
}
