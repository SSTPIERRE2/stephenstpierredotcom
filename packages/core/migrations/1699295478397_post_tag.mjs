import { sql } from 'kysely';

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable('post_tag')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('post_id', 'text', (col) => col.notNull())
    .addColumn('tag_id', 'text', (col) => col.notNull())
    .addColumn('created', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable('post_tag').execute();
}
