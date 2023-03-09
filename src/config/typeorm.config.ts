import { DataSourceOptions, DataSource } from "typeorm";
import * as dotenv from "dotenv";
import path from "path";

dotenv.config();

const config: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10) || 3306,
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_SCHEMA,
  entities: [path.resolve(__dirname, "../models") + "/**/*{.ts,.js}"],
  synchronize: false,
  migrationsRun: process.env.MIGRATIONS_RUN === "true",
  logging: false,
  migrations: [path.resolve(__dirname, "../migrations") + "/**/*{.ts,.js}"],
  ...(Number(process.env.DB_MAX_CONNECTIONS) && {
    extra: {
      connectionLimit: Number(process.env.DB_MAX_CONNECTIONS),
    },
  }),
};

const TypeormConnection = new DataSource(config);

TypeormConnection.initialize()
  .then(async () => {
    console.log(
      "check",
      path.resolve(__dirname + "../models") + "/**/*{.ts,.js}"
    );
    console.log("Datasource initialized");
  })
  .catch((err) => {
    console.error("Error", err);
  });

export default TypeormConnection;
