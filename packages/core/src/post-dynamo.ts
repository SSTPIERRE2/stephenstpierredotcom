export * as Post from './post-dynamo';

import { ulid } from 'ulid';
import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
} from '@aws-sdk/lib-dynamodb';

export interface Post {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  content: string;
  views: number;
  likes: number;
  tags: string[];
  isPublished: 1 | 0;
  created: string;
  publishedOn?: string;
  updated?: string;
}

export type PublishedPost = Post & { isPublished: 1; publishedOn: string };

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export type PostToCreate = Pick<
  Post,
  'title' | 'slug' | 'abstract' | 'content' | 'tags' | 'publishedOn' | 'updated'
>;

export async function create(
  tableName: string,
  post: PostToCreate & { isPublished?: 1 | 0; views?: number; likes?: number },
) {
  const id = ulid();
  const command = new PutCommand({
    TableName: tableName,
    Item: {
      id,
      ...post,
      isPublished: post.isPublished || 0,
      views: post.views || 0,
      likes: post.likes || 0,
      created: new Date().toISOString(),
    },
  });

  console.log(`Post - create`, command.input);

  try {
    await docClient.send(command);
    console.log(`finished putting a Post...`);
  } catch (err) {
    console.log(`caught an error while creating a Post`, err);
  }

  const created = await getById(tableName, id);
  console.log(`created post`, created);

  return created;
}

export async function getById(tableName: string, id: string) {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      id,
    },
  });

  console.log(`Post - getById - start`, command.input);

  try {
    const response = await docClient.send(command);
    console.log(`Post - getById - response`, response);
    return response['Item'];
  } catch (err) {
    console.log(`caught an error while getting a Post`, err);
    return;
  }
}

export async function getBySlug(tableName: string, slug: string) {
  const command = new QueryCommand({
    TableName: tableName,
    IndexName: 'SlugIndex',
    KeyConditionExpression: 'slug = :slug',
    ExpressionAttributeValues: {
      ':slug': slug,
    },
  });

  console.log(`Post - getBySlug - start`, slug);

  try {
    const response = await docClient.send(command);
    const result = response['Items'] || [];
    console.log(`Post - getBySlug - response`, response.Count);

    return result[0] as Post | undefined;
  } catch (err) {
    console.log(`caught an error while getting a Post`, err);
    return;
  }
}

export async function getAllBySlugs(tableName: string, slugs: string[]) {
  const promises: Promise<Post | undefined>[] = [];

  console.log(`Post - getAllBySlugs`, slugs);

  for (const slug of slugs) {
    promises.push(getBySlug(tableName, slug));
  }

  const result = await Promise.all(promises);

  console.log(`Post - getAllBySlugs - result`, result);

  return result.filter((result) => !!result) as Post[];
  // const slugFilter = slugs.map((_slug, index) => {
  //   return `:slug${index}`;
  // });
  // const slugExpression = slugFilter.reduce((acc, curr, index) => {
  //   return {
  //     ...acc,
  //     [curr]: slugs[index],
  //   };
  // }, {});
  // const command = new ScanCommand({
  //   TableName: tableName,
  //   IndexName: 'SlugIndex',
  //   FilterExpression: `slug IN (${slugFilter.join(', ')})`,
  //   ExpressionAttributeValues: slugExpression,
  // });

  // try {
  //   const response = await docClient.send(command);
  //   console.log(`Post - getAllBySlugs - response`, response);
  //   return response['Items'] as Post[];
  // } catch (err) {
  //   console.log(`caught an error while getting Posts by slugs`, err);
  //   return;
  // }
}

export async function list(tableName: string) {
  const command = new ScanCommand({
    TableName: tableName,
  });
  const result = await docClient.send(command);

  return result.Items || [];
}

export async function queryPublished(tableName: string, tag?: string) {
  const command = new QueryCommand({
    TableName: tableName,
    IndexName: 'IsPublishedIndex',
    KeyConditionExpression: 'isPublished = :val',
    ExpressionAttributeValues: {
      ':val': 1,
    },
  });

  const result = await docClient.send(command);
  console.log(`queryPublished`, result.Count);

  let posts = (result.Items || []) as PublishedPost[];

  if (tag) {
    posts = posts.filter((post) => post.tags.includes(tag));
    console.log(`filtered posts by tag ${tag}...`);
  }

  posts.sort(
    (a, b) =>
      new Date(b.publishedOn).getTime() - new Date(a.publishedOn).getTime(),
  );

  return posts;
}

export async function update(tableName: string, values: Partial<Post>) {
  const { id, ...props } = values;
  delete props.updated;
  console.log(`Post - Update`);

  const setStatement = Object.keys(props)
    .map((key) => {
      console.log(key);
      if (key === 'views') {
        return `#views = :views`;
      }
      return `${key} = :${key}`;
    })
    .join(', ');
  const UpdateExpression = `set ${setStatement}, updated = :updated`;
  console.log(`UpdateExpression`, UpdateExpression);

  const ExpressionAttributeValues: Record<string, unknown> = Object.keys(
    props,
  ).reduce((acc, curr) => {
    return {
      ...acc,
      [`:${curr}`]: values[curr as keyof Post],
    };
  }, {});
  ExpressionAttributeValues.updated = new Date().toISOString();
  console.log(`ExpressionAttributeValues`, ExpressionAttributeValues);

  const command = new UpdateCommand({
    TableName: tableName,
    Key: {
      id,
    },
    UpdateExpression,
    ExpressionAttributeNames: {
      '#views': 'views',
    },
    ExpressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  });

  try {
    const response = await docClient.send(command);
    console.log(`Post - update - response`, response);
    return response;
  } catch (err) {
    console.log(`caught an error while updating a Post`, err);
    return;
  }
}

export async function increment(
  tableName: string,
  id: string,
  attribute: 'views' | 'likes',
) {
  const command = new UpdateCommand({
    TableName: tableName,
    Key: {
      id,
    },
    UpdateExpression: 'ADD #cnt :val',
    ExpressionAttributeNames: { '#cnt': attribute },
    ExpressionAttributeValues: {
      ':val': 1,
    },
    ReturnValues: 'UPDATED_NEW',
  });
  const response = await docClient.send(command);

  console.log(`increment`, response);

  return response?.Attributes?.[attribute] as number;
}

export async function deleteById(tableName: string, id: string) {
  const deleteCommand = new DeleteCommand({
    TableName: tableName,
    Key: {
      id,
    },
  });

  return await docClient.send(deleteCommand);
}

export async function deleteAll(tableName: string) {
  const posts = await list(tableName);
  console.log(`Post - deleteAll listed posts`, posts);

  for (const post of posts) {
    const deleteCommand = new DeleteCommand({
      TableName: tableName,
      Key: {
        id: post.id,
      },
    });
    await docClient.send(deleteCommand);
  }
}
