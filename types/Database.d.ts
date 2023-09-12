interface FieldQuery {
  name: ReferenceExpression<Database, 'analytics_event'>;
  value: string;
  matcher?: ComparisonOperatorExpression;
}

type AnalyticsEventName =
  | 'pageView'
  | 'click'
  | 'cursorThrash'
  | 'error'
  | 'navigation'
  | 'hover'
  | 'rageClick'
  | 'form';

type AnalyticsEventField = 'name' | 'created' | 'metadata';
