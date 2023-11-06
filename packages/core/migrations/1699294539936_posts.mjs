import { Kysely, sql } from 'kysely';

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable('posts')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('type', 'integer', (col) => col.notNull())
    .addColumn('likes', 'integer', (col) => col.notNull())
    .addColumn('created', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable('posts').execute();
}
