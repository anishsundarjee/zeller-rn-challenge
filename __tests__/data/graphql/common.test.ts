import { ROLES } from '@/types';
import { queryOperation } from '@data/graphql/common';
import { LIST_ZELLER_CUSTOMERS } from '@data/graphql/customer/query';
import { GraphQLResult } from '@aws-amplify/api-graphql';

const mockGraphQL = jest.fn();

jest.mock('aws-amplify', () => {
  return {
    API: {
      graphql: () => mockGraphQL,
    },
    graphqlOperation: () => jest.fn(),
  };
});

describe('--- Common Service ---', () => {
  it('queryOperation with null data response', async () => {
    mockGraphQL.mockResolvedValueOnce({ data: { [LIST_ZELLER_CUSTOMERS.dataObject]: null } } as GraphQLResult<Record<string, any>>);

    const data = await queryOperation(
      LIST_ZELLER_CUSTOMERS.query,
      { filter: { role: { eq: ROLES.ADMIN }}, limit: 10, nextToken: '' },
      LIST_ZELLER_CUSTOMERS.dataObject,
      'API_KEY',
    );

    expect(data).toEqual({ successful: false });
  });

  it('queryOperation with missing data object', async () => {
    mockGraphQL.mockResolvedValueOnce({ data: {} } as GraphQLResult<Record<string, any>>);

    const data = await queryOperation(
      LIST_ZELLER_CUSTOMERS.query,
      { filter: { role: { eq: ROLES.ADMIN }}, limit: 10, nextToken: '' },
      LIST_ZELLER_CUSTOMERS.dataObject,
      'API_KEY',
    );

    expect(data).toEqual({ successful: false });
  });
});
