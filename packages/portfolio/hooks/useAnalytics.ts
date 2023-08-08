import { useAuth } from '@/app/context/AuthContext';
import { useCallback } from 'react';
import { gql, useMutation, useQuery } from 'urql';

const AnalyticsQuery = gql`
  query ($fields: String!) {
    analyticsEvents(fields: $fields) {
      name
      visitorId
      url
      metadata
    }
  }
`;

const CreateAnalyticsQuery = gql`
  mutation ($name: EventName!, $visitorId: String!, $metadata: String) {
    createAnalyticsEvent(
      name: $name
      visitorId: $visitorId
      metadata: $metadata
    ) {
      name
      visitorId
      metadata
    }
  }
`;

type createAnalyticType = {
  name: AnalyticsEventName;
  metadata?: string;
};

export const useCreateAnalytic = () => {
  const [result, createAnalytic] = useMutation<
    unknown,
    {
      name: AnalyticsEventName;
      visitorId: string;
      metadata?: string;
    }
  >(CreateAnalyticsQuery);
  const { visitorId } = useAuth();
  /**
   * Memoize extended createAnalytic mutation with visitorId from localStorage
   * Only execute query once visitorId is retrieved (on second render (on client))
   */
  const createAnalyticMemo = useCallback(
    ({ name, metadata }: createAnalyticType) => {
      console.log(`createAnalyticMemo called`, visitorId);
      if (visitorId) {
        createAnalytic({ name, visitorId, metadata });
      }
    },
    [visitorId]
  );

  return {
    result,
    createAnalytic: createAnalyticMemo,
  };
};

/**
 * Query analytics given a list of fields to filter results, otherwise select all.
 * @param variables
 * @returns
 */
export const useQueryAnalytics = (variables?: { fields: FieldQuery[] }) => {
  const [result, reexecuteQuery] = useQuery({
    query: AnalyticsQuery,
    variables: { fields: JSON.stringify(variables?.fields || []) },
  });
  console.log('useQueryAnalytics', result);
  return { result, reexecuteQuery };
};
