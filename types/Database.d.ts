interface FieldQuery {
  name: ReferenceExpression<Database, 'analytics_event'>;
  value: string;
  matcher?: ComparisonOperatorExpression;
}
