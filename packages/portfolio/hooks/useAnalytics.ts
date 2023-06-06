import { gql, useMutation, useQuery } from 'urql';

const CreateAnalyticsQuery = gql`
  mutation ($name: String!, $email: String!, $metadata: String!) {
    createAnalyticsEvent(name: $name, email: $email, metadata: $metadata) {
      name
      email
      metadata
    }
  }
`;

const useAnalytics = () => {
  const [result, createAnalytic] = useMutation(CreateAnalyticsQuery);
  return [result, createAnalytic];
};

export default useAnalytics;
