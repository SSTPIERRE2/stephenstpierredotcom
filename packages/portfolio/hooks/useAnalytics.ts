import { useAuth } from '@/app/context/AuthContext';
import { useCallback } from 'react';
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

type createAnalyticType = {
  name: AnalyticsEventName;
  email?: string;
  metadata?: string;
};

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
  const { visitorId } = useAuth();
  /**
   * Memoize extended createAnalytic mutation with visitorId from localStorage
   * Only execute query once visitorId is retrieved (on second render (on client))
   */
  const createAnalyticMemo = useCallback(
    ({ name, email, metadata }: createAnalyticType) => {
      console.log(`createAnalyticMemo called`, visitorId);
      if (visitorId) {
        createAnalytic({ name, email, visitorId, metadata });
      }
    },
    [visitorId]
  );

  return {
    result,
    createAnalytic: createAnalyticMemo,
  };
};

export const useQueryAnalytics = (variables: { fields: FieldQuery[] }) => {
  const [result, reexecuteQuery] = useQuery({
    query: AnalyticsQuery,
    variables: { fields: JSON.stringify(variables.fields) },
  });
  return { result, reexecuteQuery };
};
