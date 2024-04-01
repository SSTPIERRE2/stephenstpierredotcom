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

export interface Tag {
  name: string;
  created: string;
}

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export async function create(tableName: string, name: string) {
  const command = new PutCommand({
    TableName: tableName,
    Item: {
      name,
      created: new Date().toISOString(),
    },
  });

  await docClient.send(command);

  const created = await getByName(tableName, name);

  return created;
}

export async function getByName(tableName: string, name: string) {
  const command = new GetCommand({
    TableName: tableName,
    Key: {
      name,
    },
  });

  const response = await docClient.send(command);
  return response['Item'];
}

export async function getAllByNames(tableName: string, names: string[]) {
  const Keys = names.map((name) => ({ name }));

  const command = new BatchGetCommand({
    RequestItems: {
      [tableName]: {
        Keys,
      },
    },
  });

  const result = await docClient.send(command);
  const responses = result['Responses'] || {};

  return responses[tableName];
}

export async function list(tableName: string) {
  const command = new ScanCommand({
    TableName: tableName,
  });
  const result = await docClient.send(command);

  return result.Items || [];
}

export async function deleteAll(tableName: string) {
  const tags = await list(tableName);

  for (const tag of tags) {
    const deleteCommand = new DeleteCommand({
      TableName: tableName,
      Key: {
        name: tag.name,
      },
    });
    await docClient.send(deleteCommand);
  }
}
