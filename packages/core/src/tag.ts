export * as Tag from './tag';

import { ulid } from 'ulid';
import { SQL } from './sql';

export interface Tag {
  id: string;
  name: string;
}

export async function create(name: string) {
  const result = await SQL.DB.insertInto('tag')
    .values({ id: ulid(), name })
    .returningAll()
    .executeTakeFirstOrThrow();

  return result;
}

export async function createAll(names: string[]) {
  const values = names.map((name) => ({
    id: ulid(),
    name,
  }));

  const result = await SQL.DB.insertInto('tag')
    .values(values)
    .returningAll()
    .execute();

  return result;
}

export function list() {
  return SQL.DB.selectFrom('tag')
    .selectAll()
    .orderBy('created', 'desc')
    .execute();
}

export async function getAllByPostId(post_id: string) {
  const result = await SQL.DB.selectFrom('tag')
    .selectAll()
    .innerJoin('post_tag', 'tag.id', 'post_tag.tag_id')
    .where('post_tag.post_id', '=', post_id)
    .execute();

  return result;
}

export async function getByName(name: string) {
  const result = await SQL.DB.selectFrom('tag')
    .selectAll()
    .where('name', '=', name)
    .executeTakeFirst();

  return result;
}

export async function getAllByNames(names: string[]) {
  const result = await SQL.DB.selectFrom('tag')
    .selectAll()
    .where('name', 'in', names)
    .execute();

  return result;
}
