import { Kysely, sql } from 'kysely';

/**
 * @param db {Kysely<any>}
 */
export async function up(db) {
  await db.schema
    .createTable('post_upvote')
    .addColumn('id', 'text', (col) => col.primaryKey())
    .addColumn('post_id', 'text', (col) => col.notNull())
    .addColumn('visitor_id', 'text', (col) => col.notNull())
    .addColumn('votes', 'integer', (col) => col.notNull().defaultTo(0))
    .addColumn('created', 'timestamp', (col) =>
      col.notNull().defaultTo(sql`now()`)
    )
    .execute();
}

/**
 * @param db {Kysely<any>}
 */
export async function down(db) {
  await db.schema.dropTable('post_upvote').execute();
}
