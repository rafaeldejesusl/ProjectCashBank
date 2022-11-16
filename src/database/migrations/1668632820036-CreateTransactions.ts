import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTransactions1668632820036 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "Transactions",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "debitedAccountId",
                        type: "uuid"
                    },
                    {
                        name: "creditedAccountId",
                        type: "uuid"
                    },
                    {
                        name: "value",
                        type: "decimal",
                        isNullable: false
                    },
                    {
                        name: "createdAt",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                foreignKeys: [
                    {
                        name: "fk_debitedAccountId",
                        columnNames: ["debitedAccountId"],
                        referencedTableName: "Accounts",
                        referencedColumnNames: ["id"]
                    },
                    {
                        name: "fk_creditedAccountId",
                        columnNames: ["creditedAccountId"],
                        referencedTableName: "Accounts",
                        referencedColumnNames: ["id"]
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("Transactions")
    }

}
