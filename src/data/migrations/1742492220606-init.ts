import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1742492220606 implements MigrationInterface {
    name = 'Init1742492220606'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."assets_asset_status_enum" AS ENUM('processing', 'completed', 'failed')`);
        await queryRunner.query(`CREATE TABLE "assets" ("id" uuid NOT NULL DEFAULT gen_random_uuid(), "key" character varying NOT NULL, "mime_type" character varying NOT NULL, "asset_status" "public"."assets_asset_status_enum" NOT NULL DEFAULT 'processing', "object_url" character varying, "doc_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "deleted_at" TIMESTAMP, CONSTRAINT "PK_da96729a8b113377cfb6a62439c" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "assets"`);
        await queryRunner.query(`DROP TYPE "public"."assets_asset_status_enum"`);
    }

}
