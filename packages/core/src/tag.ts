export * as Tag from './tag';

import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import {
  BatchGetCommand,
  DeleteCommand,
  DynamoDBDocumentClient,
  GetCommand,
  PutCommand,
  ScanCommand,
} from '@aws-sdk/lib-dynamodb';
import { Table } from 'sst/node/table';

const TagTable = Table.Tag.tableName;

export interface Tag {
  name: string;
  created: string;
}

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export async function create(name: string) {
  const command = new PutCommand({
    TableName: TagTable,
    Item: {
      name,
      created: new Date().toISOString(),
    },
  });

  await docClient.send(command);

  const created = await getByName(name);

  return created;
}

export async function getByName(name: string) {
  const command = new GetCommand({
    TableName: TagTable,
    Key: {
      name,
    },
  });

  const response = await docClient.send(command);
  return response['Item'];
}

export async function getAllByNames(names: string[]) {
  const Keys = names.map((name) => ({ name }));

  const command = new BatchGetCommand({
    RequestItems: {
      [TagTable]: {
        Keys,
      },
    },
  });

  const result = await docClient.send(command);
  const responses = result['Responses'] || {};

  return responses[TagTable];
}

export async function list() {
  const command = new ScanCommand({
    TableName: TagTable,
  });
  const result = await docClient.send(command);

  return result.Items || [];
}

export async function deleteAll() {
  const tags = await list();

  for (const tag of tags) {
    const deleteCommand = new DeleteCommand({
      TableName: TagTable,
      Key: {
        name: tag.name,
      },
    });
    await docClient.send(deleteCommand);
  }
}
