import { ConnectionOptions } from "typeorm";
import { User } from "./entities/User";

const config: ConnectionOptions = {
  type: "postgres",
  username: "postgres",
  password: "postgres",
  database: "test",
  logging: true,
  synchronize: true,
  entities: [User]
};

export default config;
