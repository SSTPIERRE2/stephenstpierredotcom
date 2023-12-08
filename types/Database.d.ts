interface FieldQuery {
  name: ReferenceExpression<Database, 'analytics_event'>;
  value: string;
  matcher?: ComparisonOperatorExpression;
}

type AnalyticName =
  | 'pageView'
  | 'click'
  | 'cursorThrash'
  | 'error'
  | 'navigation'
  | 'hover'
  | 'rageClick'
  | 'form';

type AnalyticField = 'name' | 'created' | 'metadata';
