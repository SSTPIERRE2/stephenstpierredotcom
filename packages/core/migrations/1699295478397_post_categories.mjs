import { Kysely, sql } from 'kysely';

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable('post_categories')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('post_id', 'integer', (col) => col.notNull())
    .addColumn('category_id', 'integer', (col) => col.notNull())
    .addColumn('created', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable('post_categories').execute();
}
