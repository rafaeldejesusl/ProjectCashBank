import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'cash_db',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/entities/*{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});