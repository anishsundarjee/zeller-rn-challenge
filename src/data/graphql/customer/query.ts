export const LIST_ZELLER_CUSTOMERS = {
  dataObject: 'listZellerCustomers',
  query: `
    query get($filter: TableZellerCustomerFilterInput, $limit: Int, $nextToken: String) {
      listZellerCustomers(filter: $filter, limit: $limit, nextToken: $nextToken) {
        items {
          id
          name
          email
          role
        }
        nextToken
      }
    }
  `,
};