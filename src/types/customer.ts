export const enum ROLES {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
};

export type TRole = ROLES.ADMIN | ROLES.MANAGER;

export type TFilterOptions = {
  label: string;
  value: TRole | string;
  type: 'role' | 'name';
  isSelected: boolean;
};

export type TCustomer = {
  id: string;
  name: string;
  email: string;
  role: TRole;
};

type TListZellerCustomerFilter<T> = {
  ne: T;
  eq: T;
  le: T;
  lt: T;
  ge: T;
  gt: T;
  contains: T;
  notContains: T;
  between: [T];
  beginsWith: T;
};

type TFilter = {
  id: Partial<TListZellerCustomerFilter<string>>;
  name: Partial<TListZellerCustomerFilter<string>>;
  email: Partial<TListZellerCustomerFilter<string>>;
  role: Partial<TListZellerCustomerFilter<TRole>>;
};

export type TPartialFilter = Partial<TFilter>;

export type TListZellerCustomersResult = {
  items: TCustomer[];
  nextToken: string;
};