import { DataSource } from "typeorm";

export const connectionSource = new DataSource({
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: 'postgres',
  port: 5432,
  username: 'postgres',
  password: 'mysecretpassword',
  database: 'ngcash_db',
  logging: false,
  synchronize: false,
  name: 'default',
  entities: ['src/entities/*{.ts,.js}'],
  migrations: ['src/database/migrations/*{.ts,.js}'],
});

connectionSource.initialize();

export default connectionSource;
