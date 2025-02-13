export class PaginationRequest {
  page: number;
  pageSize: number;
  filter: SearchFilter;
  order: Order;
}

export class SearchFilter {
  conditionOperator: ConditionOperator;
  filters: Filter[];
}

export enum ConditionOperator {
  AND,
  OR,
}

export class Filter {
  displayName: string;
  propertyName: string;
  operator: Operator;
  value: any;
  caseSensitive: boolean;
  dataType: string;
  selectedDateFormat?: string;
}

export enum Operator {
  equals,
  greaterThan,
  lessThan,
  greaterThanOrEqual,
  lessThanOrEqual,
  contains,
  startsWith,
  endsWith,
  notEquals,
  in,
}

export class Order {
  orderByProperty: string;
  sortOrder: SortOrder;
}

export enum SortOrder {
  ascending = 1,
  descending = -1,
  noSort = 0,
}

export class selectMenu {
  text: string;
  value: string;
}
