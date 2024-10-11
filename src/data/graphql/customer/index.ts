import { queryOperation } from '../common';
import { LIST_ZELLER_CUSTOMERS } from './query';
import { TListZellerCustomersResult, TPartialFilter } from '@/types';

export const listZellerCustomers = async (
  filter: TPartialFilter,
  limit: number,
  nextToken: string
) => {
  return queryOperation<TListZellerCustomersResult>(
    LIST_ZELLER_CUSTOMERS.query,
    { filter, limit, nextToken },
    LIST_ZELLER_CUSTOMERS.dataObject,
    'API_KEY'
  );
};