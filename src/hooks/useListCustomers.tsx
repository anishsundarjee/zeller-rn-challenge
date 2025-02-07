import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { listZellerCustomers } from '@/data';
import { TPartialFilter, TCustomer } from '@/types';

type TListCustomerParams = {
  filter: TPartialFilter;
  limit?: number;
  nextToken?: string;
};

export const useListCustomers = ({ filter, limit = 10, nextToken = '' }: TListCustomerParams) => {
  const { data, isLoading, isError, refetch, isRefetching, isPlaceholderData } = useQuery({
    queryKey: ['listZellerCustomers', filter, limit, nextToken],
    queryFn: () => getCustomers(),
    placeholderData: keepPreviousData,
  });

  const getCustomers = async () => {
    const result = await listZellerCustomers(filter, limit, nextToken);

    if (!result.successful) {
      throw new Error("Error loading data.");
    }

    return result.data;
  };

  let items: TCustomer[] = [];
  if (data) {
    items = data.items ?? [];
    items.sort((a, b) => a.name.localeCompare(b.name));
  }

  return {
    data: items,
    isLoading: isPlaceholderData ? false : isLoading,
    isRefetching,
    isError,
    refetch,
  };
};