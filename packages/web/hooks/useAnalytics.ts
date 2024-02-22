import { useAuth } from '@/app/context/AuthContext';
import { useCallback } from 'react';
import { gql, useMutation, useQuery } from 'urql';

const AnalyticsQuery = gql`
  query AnalyticsEvents($fields: String!) {
    analyticsEvents(fields: $fields) {
      id
      name
      visitorId
      url
      metadata
    }
  }
`;

const CountAnalyticsQuery = gql`
  query CountAnalytics {
    countEvents {
      name
      total
    }
  }
`;

const CreateAnalyticsQuery = gql`
  mutation CreateAnalytic(
    $name: EventName!
    $visitorId: String!
    $metadata: String
  ) {
    createAnalytic(name: $name, visitorId: $visitorId, metadata: $metadata) {
      id
      name
      visitorId
      metadata
    }
  }
`;

type createAnalyticType = {
  name: AnalyticName;
  metadata?: string;
};

export const useCreateAnalytic = () => {
  const [result, createAnalytic] = useMutation<
    unknown,
    {
      name: AnalyticName;
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
    [visitorId, createAnalytic],
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

export const useCountAnalytics = () => {
  const [result, reexecuteQuery] = useQuery({
    query: CountAnalyticsQuery,
  });
  console.log('useCountAnalytics', result);
  return { result, reexecuteQuery };
};
