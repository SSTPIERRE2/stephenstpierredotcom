import { Kysely, sql } from 'kysely';

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable('analytics_event')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('visitor_id', 'text', (col) => col.notNull())
    .addColumn('name', 'text', (col) => col.notNull())
    .addColumn('url', 'text', (col) => col.notNull())
    .addColumn('browser_name', 'text', (col) => col.notNull())
    .addColumn('browser_version', 'text', (col) => col.notNull())
    .addColumn('browser_engine', 'text', (col) => col.notNull())
    .addColumn('device_model', 'text', (col) => col.notNull())
    .addColumn('device_type', 'text', (col) => col.notNull())
    .addColumn('device_vendor', 'text', (col) => col.notNull())
    .addColumn('os_name', 'text', (col) => col.notNull())
    .addColumn('os_version', 'text', (col) => col.notNull())
    .addColumn('email', 'text')
    .addColumn('metadata', 'jsonb', (col) => col.notNull())
    .addColumn('created', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  await db.schema
    .createIndex('idx_analytics_event_created')
    .on('analytics_event')
    .column('created')
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex('idx_analytics_event_created').execute();
  await db.schema.dropTable('analytics_event').execute();
}
