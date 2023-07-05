import { Kysely, sql } from 'kysely';

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable('message')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('text', 'text', (col) => col.notNull())
    .addColumn('email', 'text', (col) => col.notNull())
    .addColumn('created', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();

  await db.schema
    .createIndex('idx_message_created')
    .on('message')
    .column('created')
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropIndex('idx_message_created').execute();
  await db.schema.dropTable('message').execute();
}
