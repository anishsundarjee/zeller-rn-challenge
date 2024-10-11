import { API } from 'aws-amplify';
import { GraphQLResult } from '@aws-amplify/api-graphql';

export const queryOperation = async <T>(
  query: string,
  params: object | undefined,
  dataObject: string,
  authMode: 'API_KEY'
) => {
  try {
    const result = await API.graphql<T>({
      query: query,
      variables: params,
      authMode
    }) as GraphQLResult<Record<string, T>>;
    if (result.data && result.data[dataObject] !== null) {
      return {
        successful: true,
        data: result.data[dataObject] as T,
      };
    }
    return { successful: false };
  } catch (err) {
    console.error('queryOperation error:', err, query);
    return { successful: false, error: 'Error loading data.' };
  }
};