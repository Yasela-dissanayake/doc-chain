import { DataSource } from "typeorm";
import { Document } from "./entities/Document";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost", // Your database host
  port: 5432,
  username: "docchain_user", // Your database username
  password: "doc12#$@in", // Your database password
  database: "chaindb",
  entities: [Document],
  synchronize: true, // Set to false in production
  logging: true,
});
