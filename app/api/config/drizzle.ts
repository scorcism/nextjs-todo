import { Pool } from 'pg';
import { drizzle } from 'drizzle-orm/node-postgres';
import { config } from './config';

const setupDrizzle = async (): Promise<any> => {
    const pool = await new Pool({
        host: config.db.host,
        port: Number(config.db.port),
        user: config.db.user,
        password: config.db.password,
        database: config.db.database,
    });
    const db = drizzle(pool);

    return db;
};

export { setupDrizzle };
