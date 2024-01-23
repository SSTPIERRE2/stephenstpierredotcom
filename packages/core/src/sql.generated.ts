import type { ColumnType } from "kysely";

export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;

export type Json = ColumnType<JsonValue, string, string>;

export type JsonArray = JsonValue[];

export type JsonObject = {
  [K in string]?: JsonValue;
};

export type JsonPrimitive = boolean | null | number | string;

export type JsonValue = JsonArray | JsonObject | JsonPrimitive;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface Analytic {
  id: string;
  visitor_id: string;
  name: string;
  url: string;
  browser_name: string;
  browser_version: string;
  browser_engine: string;
  device_model: string;
  device_type: string;
  device_vendor: string;
  os_name: string;
  os_version: string;
  metadata: Json;
  created: Generated<Timestamp>;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  abstract: string;
  content: string;
  views: Generated<number>;
  is_published: boolean | null;
  published_on: Timestamp | null;
  created: Generated<Timestamp>;
  updated: Timestamp | null;
}

export interface PostTag {
  id: string;
  post_id: string;
  tag_id: string;
  created: Generated<Timestamp>;
}

export interface PostUpvote {
  id: string;
  post_id: string;
  visitor_id: string;
  votes: Generated<number>;
  created: Generated<Timestamp>;
}

export interface Tag {
  id: string;
  name: string;
  created: Generated<Timestamp>;
}

export interface User {
  id: string;
  email: string;
  password: string;
  created: Generated<Timestamp>;
}

export interface Database {
  analytic: Analytic;
  post: Post;
  post_tag: PostTag;
  post_upvote: PostUpvote;
  tag: Tag;
  user: User;
}
