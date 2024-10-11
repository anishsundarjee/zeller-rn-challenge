import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import { it, describe, beforeEach } from '@jest/globals';
import { UserListPresenter } from '@/screens';
import { useListCustomers } from '@/hooks';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { TFilterOptions, ROLES, TCustomer } from '@/types';
jest.useFakeTimers();

jest.mock('react-native-safe-area-context', () => {
  return {
    useSafeAreaInsets: () => ({ top: 0, bottom: 0 }),
  };
});

const mockedNavigation = jest.fn();

jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: () => ({
      navigate: mockedNavigation,
    }),
  };
});

const mockDataAdmin: TCustomer[] = [
  {
    id: '1',
    name: 'Customer 1',
    email: 'customer@mock.com',
    role: ROLES.ADMIN
  },
  {
    id: '2',
    name: 'Customer 2',
    email: 'customer2@mock.com',
    role: ROLES.ADMIN
  }
];

const managerFilterOptions: TFilterOptions = { label: 'Manager', value: ROLES.MANAGER, type: 'role', isSelected: true };

const mockDataManager: TCustomer[] = [
  {
    id: '3',
    name: 'Customer 3',
    email: 'customer3@mock.com',
    role: ROLES.MANAGER
  },
  {
    id: '4',
    name: 'Customer 4',
    email: 'customer4@mock.com',
    role: ROLES.MANAGER
  },
];

const mockSearchData: TCustomer[] = [
  {
    id: '3',
    name: 'Customer 3',
    email: 'customer3@mock.com',
    role: ROLES.MANAGER
  },
];

jest.mock('@hooks/useListCustomers');

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: false } },
});

describe('---UserListPresenter---', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  it('render loading state', () => {
    useListCustomers.mockReturnValueOnce({
      data: [],
      isLoading: true,
      isError: false,
      refetch: jest.fn(),
    });

    const tree = renderer.create(
      <QueryClientProvider client={queryClient}>
        <UserListPresenter />
      </QueryClientProvider>
    );

    expect(tree.root.findByProps({ testID: 'user-list-screen-loading' }).props).toBeDefined();
  });
  it('render error state and refetch', async () => {
    const mockRefetch = jest.fn();
    useListCustomers.mockReturnValueOnce({
      data: [],
      isLoading: false,
      isError: true,
      refetch: mockRefetch,
    });

    const tree = renderer.create(
      <QueryClientProvider client={queryClient}>
        <UserListPresenter />
      </QueryClientProvider>
    );

    expect(tree.root.findByProps({ testID: 'user-list-screen-error' }).props).toBeDefined();

    await renderer.act(async () => {
      await tree.root.findByProps({ testID: 'user-list-screen-error' }).props.onPress();
    });

    expect(mockRefetch).toHaveBeenCalled();
  });
  it('compare snapshot admin users', () => {
    useListCustomers.mockReturnValueOnce({
      data: mockDataAdmin,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const tree = renderer.create(
      <QueryClientProvider client={queryClient}>
        <UserListPresenter />
      </QueryClientProvider>
    );
    expect(tree).toMatchSnapshot();
  });
  it('render data', () => {
    useListCustomers.mockReturnValueOnce({
      data: mockDataAdmin,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const tree = renderer.create(
      <QueryClientProvider client={queryClient}>
        <UserListPresenter />
      </QueryClientProvider>
    );
    expect(tree.root.findByProps({ testID: 'user-list-container' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-filter-input' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-type-btn-Admin' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-type-btn-Manager' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-btn-Customer 1' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-btn-Customer 2' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-icon-Customer 1' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-icon-Customer 2' }).props).toBeDefined();
  });
  it('user select manager user type', async () => {
    useListCustomers.mockReturnValueOnce({
      data: mockDataAdmin,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const tree = renderer.create(
      <QueryClientProvider client={queryClient}>
        <UserListPresenter />
      </QueryClientProvider>
    );

    expect(tree.root.findByProps({ testID: 'user-btn-Customer 1' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-btn-Customer 2' }).props).toBeDefined();

    const managerBtn = tree.root.findByProps({ testID: 'user-type-btn-Manager' }).props;
    expect(managerBtn).toBeDefined();

    useListCustomers.mockReturnValueOnce({
      data: mockDataManager,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    await renderer.act(async () => {
      await managerBtn.handleFilterChange(managerFilterOptions);
    });

    expect(tree.root.findByProps({ testID: 'user-btn-Customer 3' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-btn-Customer 4' }).props).toBeDefined();
  });
  it('user select manager user type', async () => {
    useListCustomers.mockReturnValueOnce({
      data: mockDataAdmin,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const tree = renderer.create(
      <QueryClientProvider client={queryClient}>
        <UserListPresenter />
      </QueryClientProvider>
    );

    expect(tree.root.findByProps({ testID: 'user-btn-Customer 1' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-btn-Customer 2' }).props).toBeDefined();

    const input = tree.root.findByProps({ testID: 'user-filter-input' }).props;
    expect(input).toBeDefined();

    useListCustomers.mockReturnValueOnce({
      data: mockSearchData,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    await renderer.act(async () => {
      await input.onChangeText('Customer 3');
    });

    expect(tree.root.findByProps({ testID: 'user-btn-Customer 3' }).props).toBeDefined();
  });
  it('pull to refresh', async () => {
    const mockRefetch = jest.fn();
    useListCustomers.mockReturnValue({
      data: mockDataAdmin,
      isLoading: false,
      isError: false,
      refetch: mockRefetch,
    });

    const tree = renderer.create(
      <QueryClientProvider client={queryClient}>
        <UserListPresenter />
      </QueryClientProvider>
    );
    const flatList = tree.root.findByProps({ testID: 'user-list' }).props;
    expect(flatList).toBeDefined();

    const { refreshControl } = flatList;

    await renderer.act(async () => {
      refreshControl.props.onRefresh();
    });

    expect(mockRefetch).toHaveBeenCalled();
    expect(tree.root.findByProps({ testID: 'user-list-container' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-filter-input' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-type-btn-Admin' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-type-btn-Manager' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-btn-Customer 1' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-btn-Customer 2' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-icon-Customer 1' }).props).toBeDefined();
    expect(tree.root.findByProps({ testID: 'user-icon-Customer 2' }).props).toBeDefined();
  });
  it('select user from list', async () => {
    useListCustomers.mockReturnValueOnce({
      data: mockDataAdmin,
      isLoading: false,
      isError: false,
      refetch: jest.fn(),
    });

    const tree = renderer.create(
      <QueryClientProvider client={queryClient}>
        <UserListPresenter />
      </QueryClientProvider>
    );

    const userBtn = tree.root.findByProps({ testID: 'user-btn-Customer 1' }).props;
    expect(userBtn).toBeDefined();
    await renderer.act(async () => {
      userBtn.onPress(mockDataAdmin[0]);
    });

    expect(mockedNavigation).toHaveBeenCalledWith('USER_DETAILS', { id: '1' });
  });
});