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
  mutation ($name: EventName!, $email: String, $metadata: String) {
    createAnalyticsEvent(name: $name, email: $email, metadata: $metadata) {
      name
      email
      metadata
    }
  }
`;

export const useCreateAnalytic = () => {
  const [result, createAnalytic] = useMutation<
    unknown,
    { name: AnalyticsEventName; email?: string; metadata?: string }
  >(CreateAnalyticsQuery);
  return { result, createAnalytic };
};

export const useQueryAnalytics = (variables: { fields: FieldQuery[] }) => {
  const [result, reexecuteQuery] = useQuery({
    query: AnalyticsQuery,
    variables: { fields: JSON.stringify(variables.fields) },
  });
  return { result, reexecuteQuery };
};
