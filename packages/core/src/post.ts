export * as Post from './post';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  DeleteCommand,
  DynamoDBDocumentClient,
  PutCommand,
  ScanCommand,
  QueryCommand,
  UpdateCommand,
  QueryCommandInput,
  GetCommand,
} from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

const PostTable = Table.Post.tableName;

export interface Post {
  title: string;
  slug: string;
  abstract: string;
  content: string;
  views: number;
  likes: number;
  tags: string[];
  created: string;
  isPublished: 1 | 0;
  publishedOn: number;
  updated?: string;
}

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export type PostToCreate = Pick<
  Post,
  'title' | 'slug' | 'abstract' | 'content' | 'tags' | 'updated'
> & {
  isPublished?: 1 | 0;
  publishedOn?: number;
  views?: number;
  likes?: number;
};

export type PostToUpdate = Partial<Post> & {
  slug: string;
};

export async function create(post: PostToCreate) {
  const command = new PutCommand({
    TableName: PostTable,
    Item: {
      ...post,
      isPublished: post.isPublished || 0,
      publishedOn: post.publishedOn || 0,
      views: post.views || 0,
      likes: post.likes || 0,
      created: new Date().toISOString(),
    },
  });

  await docClient.send(command);

  const created = await getBySlug(post.slug);

  return created;
}

export async function getBySlug(slug: string) {
  const command = new GetCommand({
    TableName: PostTable,
    Key: {
      slug,
    },
  });

  const response = await docClient.send(command);
  const result = response['Item'];

  return result as Post | undefined;
}

export async function getAllBySlugs(slugs: string[]) {
  const promises: Promise<Post | undefined>[] = [];

  for (const slug of slugs) {
    promises.push(getBySlug(slug));
  }

  const result = await Promise.all(promises);

  return result.filter((result) => !!result) as Post[];
}

export async function list() {
  const command = new ScanCommand({
    TableName: PostTable,
  });
  const result = await docClient.send(command);

  return (result.Items || []) as Post[];
}

export async function queryPublished(tag?: string) {
  const ExpressionAttributeValues: Record<string, number | string> = {
    ':isPublished': 1,
  };
  const commandInput: QueryCommandInput = {
    TableName: PostTable,
    IndexName: 'isPublishedIndex',
    KeyConditionExpression: 'isPublished = :isPublished',
    ExpressionAttributeValues,
    ScanIndexForward: false,
  };

  if (tag) {
    commandInput.FilterExpression = 'contains(tags, :tag)';
    ExpressionAttributeValues[':tag'] = tag;
  }

  const command = new QueryCommand(commandInput);

  const result = await docClient.send(command);

  const posts = result.Items || [];

  return posts as Post[];
}

export async function update(values: PostToUpdate) {
  const { slug, ...props } = values;

  // delete old updated value if Post has been updated before, since we use the keys to build the set statement
  if (props.updated) {
    delete props.updated;
  }

  const setStatement = Object.keys(props)
    .map((key) => {
      if (key === 'views') {
        return `#views = :views`;
      }
      return `${key} = :${key}`;
    })
    .join(', ');

  const UpdateExpression = `set ${setStatement}, updated = :updated`;
  const ExpressionAttributeValues: Record<string, unknown> = Object.keys(
    props,
  ).reduce((acc, curr) => {
    return {
      ...acc,
      // Since our only optional Frontmatter-related attributes are numbers, default to 0
      [`:${curr}`]: values[curr as keyof Post] || 0,
    };
  }, {});
  ExpressionAttributeValues[':updated'] = new Date().toISOString();

  const command = new UpdateCommand({
    TableName: PostTable,
    Key: {
      slug,
    },
    UpdateExpression,
    ExpressionAttributeNames: {
      '#views': 'views',
    },
    ExpressionAttributeValues,
    ReturnValues: 'ALL_NEW',
  });

  const response = await docClient.send(command);
  return response;
}

export async function increment(slug: string, attribute: 'views' | 'likes') {
  const command = new UpdateCommand({
    TableName: PostTable,
    Key: {
      slug,
    },
    UpdateExpression: 'ADD #cnt :val',
    ExpressionAttributeNames: { '#cnt': attribute },
    ExpressionAttributeValues: {
      ':val': 1,
    },
    ReturnValues: 'UPDATED_NEW',
  });
  const response = await docClient.send(command);

  return response?.Attributes?.[attribute] as number;
}

export async function deleteByPk(slug: string) {
  const deleteCommand = new DeleteCommand({
    TableName: PostTable,
    Key: {
      slug,
    },
  });

  return await docClient.send(deleteCommand);
}

export async function deleteAll() {
  const posts = await list();
  const promises = [];

  for (const post of posts) {
    promises.push(deleteByPk(post.slug));
  }

  await Promise.all(promises);
}
