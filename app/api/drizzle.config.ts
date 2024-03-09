import { config } from "./config/config";

/** @type { import("drizzle-kit").Config } */
export default {
  schema: "./app/api/schema/*",
  out: "./app/api/migrations",
  driver: "pg",
  dbCredentials: {
    host: String(config.db.host),
    user: String(config.db.user),
    password: config.db.password,
    database: String(config.db.database),
    port: config.db.port,
  },
};
