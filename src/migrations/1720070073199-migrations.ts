import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1720070073199 implements MigrationInterface {
    name = 'Migrations1720070073199'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "applicants_strategies" ("applicant" integer NOT NULL, "strategy" integer NOT NULL, "status" integer NOT NULL DEFAULT 0, CONSTRAINT "PK_776a159a69e4b6242b3d02a422c" PRIMARY KEY ("applicant", "strategy"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "applicants_strategies_pkey" ON "applicants_strategies" ("applicant", "strategy") `);
        await queryRunner.query(`CREATE TABLE "tokens" ("id" SERIAL NOT NULL, "token" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "is_expired" boolean NOT NULL DEFAULT false, "user" integer, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "tokens_pkey" ON "tokens" ("id") `);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" text NOT NULL, "full_name" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "password" text NOT NULL, "role" integer NOT NULL, "organization" integer, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "users_pkey" ON "users" ("id") `);
        await queryRunner.query(`CREATE TABLE "strategies" ("id" SERIAL NOT NULL, "name" text NOT NULL, "description" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL, "updated_at" TIMESTAMP WITH TIME ZONE, "place" text NOT NULL, "start_at" TIMESTAMP WITH TIME ZONE NOT NULL, "end_at" TIMESTAMP WITH TIME ZONE NOT NULL, "image" text, "status" integer NOT NULL DEFAULT 0, "created_by" integer, CONSTRAINT "PK_9a0d363ddf5b40d080147363238" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "strategies_pkey" ON "strategies" ("id") `);
        await queryRunner.query(`CREATE TABLE "universities" ("id" SERIAL NOT NULL, "name" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "code" text, "image" text, "created_by" integer, CONSTRAINT "PK_8da52f2cee6b407559fdbabf59e" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "universities_pkey" ON "universities" ("id") `);
        await queryRunner.query(`CREATE TABLE "applicants" ("id" SERIAL NOT NULL, "full_name" text NOT NULL, "email" text NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE, "updated_at" TIMESTAMP WITH TIME ZONE, "mssv" text NOT NULL, "skill" text NOT NULL, "university" integer, "updated_by" integer, CONSTRAINT "PK_c02ec3c46124479ce758ca50943" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE UNIQUE INDEX "applicants_pkey" ON "applicants" ("id") `);
        await queryRunner.query(`CREATE TABLE "stragtegies_universities" ("strategy" integer NOT NULL, "university" integer NOT NULL, CONSTRAINT "PK_e0c239f2344e6e8ff897e5e1a45" PRIMARY KEY ("strategy", "university"))`);
        await queryRunner.query(`CREATE INDEX "IDX_298aee7f774732e4289b037ec4" ON "stragtegies_universities" ("strategy") `);
        await queryRunner.query(`CREATE INDEX "IDX_534ed00ce577442993827c4296" ON "stragtegies_universities" ("university") `);
        await queryRunner.query(`ALTER TABLE "applicants_strategies" ADD CONSTRAINT "FK_0f084eb79f9ce8bf6aba5f0ba4f" FOREIGN KEY ("applicant") REFERENCES "applicants"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applicants_strategies" ADD CONSTRAINT "FK_cac231400d331ce720a8c221670" FOREIGN KEY ("strategy") REFERENCES "strategies"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tokens" ADD CONSTRAINT "FK_20a1c32e04c1bde78d3f277ba6e" FOREIGN KEY ("user") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_58ff6ca47ede04727f0989e9e8e" FOREIGN KEY ("organization") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "strategies" ADD CONSTRAINT "FK_0118cd40c3be6124f2d5f8ad3c4" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "universities" ADD CONSTRAINT "FK_c721c0dd357caca04827c6bc22f" FOREIGN KEY ("created_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applicants" ADD CONSTRAINT "FK_8db269a0b6f6858914ffbbaef26" FOREIGN KEY ("university") REFERENCES "universities"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "applicants" ADD CONSTRAINT "FK_de01c9a3c0f4a999ea404d9581e" FOREIGN KEY ("updated_by") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "stragtegies_universities" ADD CONSTRAINT "FK_298aee7f774732e4289b037ec44" FOREIGN KEY ("strategy") REFERENCES "strategies"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "stragtegies_universities" ADD CONSTRAINT "FK_534ed00ce577442993827c42960" FOREIGN KEY ("university") REFERENCES "universities"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "stragtegies_universities" DROP CONSTRAINT "FK_534ed00ce577442993827c42960"`);
        await queryRunner.query(`ALTER TABLE "stragtegies_universities" DROP CONSTRAINT "FK_298aee7f774732e4289b037ec44"`);
        await queryRunner.query(`ALTER TABLE "applicants" DROP CONSTRAINT "FK_de01c9a3c0f4a999ea404d9581e"`);
        await queryRunner.query(`ALTER TABLE "applicants" DROP CONSTRAINT "FK_8db269a0b6f6858914ffbbaef26"`);
        await queryRunner.query(`ALTER TABLE "universities" DROP CONSTRAINT "FK_c721c0dd357caca04827c6bc22f"`);
        await queryRunner.query(`ALTER TABLE "strategies" DROP CONSTRAINT "FK_0118cd40c3be6124f2d5f8ad3c4"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_58ff6ca47ede04727f0989e9e8e"`);
        await queryRunner.query(`ALTER TABLE "tokens" DROP CONSTRAINT "FK_20a1c32e04c1bde78d3f277ba6e"`);
        await queryRunner.query(`ALTER TABLE "applicants_strategies" DROP CONSTRAINT "FK_cac231400d331ce720a8c221670"`);
        await queryRunner.query(`ALTER TABLE "applicants_strategies" DROP CONSTRAINT "FK_0f084eb79f9ce8bf6aba5f0ba4f"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_534ed00ce577442993827c4296"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_298aee7f774732e4289b037ec4"`);
        await queryRunner.query(`DROP TABLE "stragtegies_universities"`);
        await queryRunner.query(`DROP INDEX "public"."applicants_pkey"`);
        await queryRunner.query(`DROP TABLE "applicants"`);
        await queryRunner.query(`DROP INDEX "public"."universities_pkey"`);
        await queryRunner.query(`DROP TABLE "universities"`);
        await queryRunner.query(`DROP INDEX "public"."strategies_pkey"`);
        await queryRunner.query(`DROP TABLE "strategies"`);
        await queryRunner.query(`DROP INDEX "public"."users_pkey"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP INDEX "public"."tokens_pkey"`);
        await queryRunner.query(`DROP TABLE "tokens"`);
        await queryRunner.query(`DROP INDEX "public"."applicants_strategies_pkey"`);
        await queryRunner.query(`DROP TABLE "applicants_strategies"`);
    }

}
