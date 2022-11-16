import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateUsers1668631092070 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Users",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "username",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "password",
                        type: "varchar",
                        isNullable: false
                    },
                    {
                        name: "accountId",
                        type: "uuid"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_accountId",
                        columnNames: ["accountId"],
                        referencedTableName: "Accounts",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Users")
    }

}
