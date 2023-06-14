import { gql, useMutation, useQuery } from 'urql';

const AnalyticsQuery = gql`
  query ($fields: String!) {
    analyticsEvents(fields: $fields) {
      name
      email
      url
      metadata
    }
  }
`;

const CreateAnalyticsQuery = gql`
  mutation (
    $name: EventName!
    $visitorId: String!
    $email: String
    $metadata: String
  ) {
    createAnalyticsEvent(
      name: $name
      visitorId: $visitorId
      email: $email
      metadata: $metadata
    ) {
      name
      visitorId
      email
      metadata
    }
  }
`;

export const useCreateAnalytic = () => {
  const [result, createAnalytic] = useMutation<
    unknown,
    {
      name: AnalyticsEventName;
      visitorId: string;
      email?: string;
      metadata?: string;
    }
  >(CreateAnalyticsQuery);
  const visitorId = '';

  return {
    result,
    createAnalytic: (
      name: AnalyticsEventName,
      email?: string,
      metadata?: string
    ) => createAnalytic({ name, visitorId, email, metadata }),
  };
};

export const useQueryAnalytics = (variables: { fields: FieldQuery[] }) => {
  const [result, reexecuteQuery] = useQuery({
    query: AnalyticsQuery,
    variables: { fields: JSON.stringify(variables.fields) },
  });
  return { result, reexecuteQuery };
};
