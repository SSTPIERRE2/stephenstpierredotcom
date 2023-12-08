import { Kysely, sql } from 'kysely';

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable('post')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('type', 'integer', (col) => col.notNull())
    .addColumn('upvotes', 'integer', (col) => col.notNull())
    .addColumn('views', 'integer', (col) => col.notNull())
    .addColumn('created', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .addColumn('updated', 'timestamp')
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable('post').execute();
}
