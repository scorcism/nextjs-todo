import { setupDrizzle } from './drizzle';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';

type DatabaseRecord = Record<string, never>;

const dbModule: {
    db: NodePgDatabase<DatabaseRecord>;
    promise: Promise<NodePgDatabase<DatabaseRecord>>;
} = {
    db: {} as NodePgDatabase<DatabaseRecord>,
    promise: {} as Promise<NodePgDatabase<DatabaseRecord>>,
};

async function initializeDatabase() {
    try {
        dbModule.db = await setupDrizzle();
        dbModule.promise = Promise.resolve(dbModule.db);
    } catch (error) {
        throw new Error('Database connection is not available.');
    }
}

initializeDatabase();

export { dbModule };
