import { DataSource } from "typeorm";
import { addTransactionalDataSource, initializeTransactionalContext, StorageDriver } from "typeorm-transactional";

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT ?? 5433),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ['src/**/*.entity{.ts}'],
  migrations: ['src/database/migrations/*{.ts, .js}'],
  synchronize: false,
});

initializeTransactionalContext({ storageDriver: StorageDriver.ASYNC_LOCAL_STORAGE });
addTransactionalDataSource(AppDataSource);