import { MigrationInterface, QueryRunner } from "typeorm";

export class addOtpColumn1678369770194 implements MigrationInterface {
    name = 'addOtpColumn1678369770194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`otp\` varchar(255) NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`otp\``);
    }

}
