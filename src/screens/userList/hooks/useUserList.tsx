import { useState } from 'react';
import { useListCustomers, useRefreshByUser } from '@/hooks';
import { TPartialFilter, TFilterOptions, ROLES, TCustomer, TRole } from '@/types';
import { useNavigation } from '@react-navigation/native';
import { DefaultAppScreenNavigationProp } from '@navigation/types';

export const useUserList = () => {
  const { navigate } = useNavigation<DefaultAppScreenNavigationProp>();
  const [filter, setFilter] = useState<TPartialFilter>({ role: { eq: ROLES.ADMIN } });
  const [filterOptions, setFilterOptions] = useState<TFilterOptions[]>([
    { label: 'Admin', value: ROLES.ADMIN, type: 'role', isSelected: true },
    { label: 'Manager', value: ROLES.MANAGER, type: 'role', isSelected: false },
  ]);
  const { data, isLoading, isError, refetch } = useListCustomers({filter});

  const refreshData = async () => {
    await refetch();
  };

  const { isRefetchingByUser, refetchByUser } = useRefreshByUser(refreshData);

  const handleFilterChange = (value: TFilterOptions) => {
    const newFilterOptions = filterOptions.map((option) => {
      if (option.label === value.label) {
        return { ...option, isSelected: true };
      }
      return { ...option, isSelected: false };
    });
    setFilterOptions(newFilterOptions);
  
    if (value.type === 'role') {
      setFilter({ role: { eq: value.value as TRole } });
    } else {
      setFilter({ name: { contains: value.value } });
    }
  };

  const handleUserPress = (customer: TCustomer) => {
    navigate('USER_DETAILS', { id: customer.id });
  };

  return {
    data: data,
    filterOptions,
    handleFilterChange,
    handleUserPress,
    isLoading,
    isError,
    refreshData,
    refreshing: isRefetchingByUser,
    onRefresh: refetchByUser,
  };
};