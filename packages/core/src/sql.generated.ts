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

export interface AnalyticsEvent {
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

export interface Message {
  id: string;
  text: string;
  email: string;
  created: Generated<Timestamp>;
}

export interface Users {
  id: string;
  email: string;
  password: string;
  created: Generated<Timestamp>;
}

export interface Database {
  analytics_event: AnalyticsEvent;
  message: Message;
  users: Users;
}
