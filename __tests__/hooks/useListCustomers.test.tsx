import { useListCustomers } from '@/hooks';
import { TListZellerCustomersResult, ROLES } from '@/types';

const mockedUseQuery = jest.fn();
jest.mock('@tanstack/react-query', () => ({
  useQuery: () => mockedUseQuery(),
}));

const mockData: TListZellerCustomersResult = {
  items: [{ id: '1', name: 'Customer 1', email: 'customer@mock.com', role: ROLES.ADMIN }],
  nextToken: 'nextToken',
};

const mocklistZellerCustomers = jest.fn();
jest.mock('@/data', () => ({
  listZellerCustomers: mocklistZellerCustomers,
}));

describe('useListCustomers', () => {
  const mockFilter = { role: { eq: ROLES.ADMIN } };
  const mockLimit = 10;
  const mockNextToken = 'nextToken';
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('return success data', () => {
    mocklistZellerCustomers.mockReturnValueOnce({ successful: true, data: mockData });
    mockedUseQuery.mockReturnValueOnce({
      data: mockData,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
      isRefetching: false
    });

    const result = useListCustomers({ filter: mockFilter, limit: mockLimit, nextToken: mockNextToken });

    expect(mockedUseQuery).toHaveBeenCalled();

    expect(result).toEqual({
      data: mockData.items,
      isLoading: false,
      isRefetching: false,
      isError: false,
      refetch: expect.any(Function),
    });
  });
  it('return loading', () => {
    mockedUseQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
      isRefetching: false
    });

    const result = useListCustomers({ filter: mockFilter, limit: mockLimit, nextToken: mockNextToken });

    expect(mockedUseQuery).toHaveBeenCalled();

    expect(result).toEqual({
      data: [],
      isLoading: true,
      isRefetching: false,
      isError: false,
      refetch: expect.any(Function),
    });
  });
  it('return error', () => {
    mocklistZellerCustomers.mockReturnValueOnce({ successful: false, message: 'Error' });
    mockedUseQuery.mockReturnValueOnce({
      data: undefined,
      isLoading: false,
      isError: true,
      refetch: jest.fn(),
      isRefetching: false
    });

    const result = useListCustomers({ filter: mockFilter, limit: mockLimit, nextToken: mockNextToken });

    expect(mockedUseQuery).toHaveBeenCalled();

    expect(result).toEqual({
      data: [],
      isLoading: false,
      isRefetching: false,
      isError: true,
      refetch: expect.any(Function),
    });
  });
});