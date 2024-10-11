import { listZellerCustomers } from '@/data/graphql/customer';
import { queryOperation } from '@/data/graphql/common';
import { LIST_ZELLER_CUSTOMERS } from '@/data/graphql/customer/query';
import { TListZellerCustomersResult, TPartialFilter, ROLES } from '@/types';

jest.mock('@/data/graphql/common', () => ({
  queryOperation: jest.fn(),
}));

describe('listZellerCustomers', () => {
  const mockFilter: TPartialFilter = { role: { eq: ROLES.ADMIN } };
  const mockLimit = 10;
  const mockNextToken = 'nextToken';
  const mockResult: TListZellerCustomersResult = {
    items: [{ id: '1', name: 'Customer 1', email: 'customer@mock.com', role: ROLES.ADMIN }],
    nextToken: 'nextToken',
  };

  beforeEach(() => {
    (queryOperation as jest.Mock).mockResolvedValue(mockResult);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should call queryOperation with correct parameters', async () => {
    await listZellerCustomers(mockFilter, mockLimit, mockNextToken);

    expect(queryOperation).toHaveBeenCalledWith(
      LIST_ZELLER_CUSTOMERS.query,
      { filter: mockFilter, limit: mockLimit, nextToken: mockNextToken },
      LIST_ZELLER_CUSTOMERS.dataObject,
      'API_KEY'
    );
  });

  it('should return the result from queryOperation', async () => {
    const result = await listZellerCustomers(mockFilter, mockLimit, mockNextToken);

    expect(result).toEqual(mockResult);
  });

  it('should handle errors thrown by queryOperation', async () => {
    const mockError = new Error('Test error');
    (queryOperation as jest.Mock).mockRejectedValue(mockError);

    await expect(listZellerCustomers(mockFilter, mockLimit, mockNextToken)).rejects.toThrow('Test error');
  });
});