const { MigrationInterface, QueryRunner } = require("typeorm");

module.exports = class Init1724786572236 {
    name = 'Init1724786572236'

    async up(queryRunner) {
        await queryRunner.query(`CREATE TABLE "favorites" ("userId" uuid NOT NULL, "entityId" uuid NOT NULL, "entityType" character varying(25) NOT NULL, "category" character varying(25) NOT NULL, CONSTRAINT "PK_4de7391c419b516c97b01504e2e" PRIMARY KEY ("userId", "entityId"))`);
    }

    async down(queryRunner) {
        await queryRunner.query(`DROP TABLE "favorites"`);
    }
}
