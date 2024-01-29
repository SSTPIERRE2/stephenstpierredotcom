import { sql } from 'kysely';

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable('analytic')
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
    .addColumn('metadata', 'jsonb', (col) => col.notNull())
    .addColumn('created', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  await db.schema
    .createIndex('idx_analytic_created')
    .on('analytic')
    .column('created')
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex('idx_analytic_created').execute();
  await db.schema.dropTable('analytic').execute();
}
