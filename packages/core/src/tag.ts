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

  console.log(`Tag - create`, command.input);

  try {
    await docClient.send(command);
    console.log(`finished putting a Tag...`);
  } catch (err) {
    console.log(`caught an error while creating a Tag`, err);
  }

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

  console.log(`Tag - getByName - start`, command.input);

  try {
    const response = await docClient.send(command);
    console.log(`Tag - getByName - response`, response);
    return response['Item'];
  } catch (err) {
    console.log(`caught an error while getting a Tag`, err);
    return;
  }
}

export async function getAllByNames(tableName: string, names: string[]) {
  const Keys = names.map((name) => ({ name }));
  console.log(`Tag - getAllByNames`, Keys);

  const command = new BatchGetCommand({
    RequestItems: {
      [tableName]: {
        Keys,
      },
    },
  });

  try {
    const result = await docClient.send(command);
    const responses = result['Responses'] || {};
    console.log(`Tag - getAllByNames - response`, responses);

    return responses[tableName];
  } catch (err) {
    console.log(`caught an error while batchGetting Tags`, err);
    return;
  }
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
  console.log(`Tag - deleteAll listed Tags`, tags);

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
