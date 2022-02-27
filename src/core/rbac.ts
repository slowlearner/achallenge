import {
  ASYNC_RBAC_REQUEST_FILTER,
  IStorageRbac,
  RBAC_REQUEST_FILTER,
} from 'nestjs-rbac';

export const RBAC: IStorageRbac = {
  roles: ['administrator', 'user'],
  permissions: {
    images: ['create', 'update', 'delete', 'list'],
    account: ['create', 'update', 'delete'],
  },
  grants: {
    user: ['images'],
    administrator: ['&user'],
  },
  filters: {
    // filter1: TestFilterOne,
    // filter2: TestFilterTwo,
    // ASYNC_filter1: TestAsyncFilterOne,
    // ASYNC_filter2: TestAsyncFilterTwo,
    // [RBAC_REQUEST_FILTER]: RequestFilter,
    // [ASYNC_RBAC_REQUEST_FILTER]: RequestAsyncFilter,
  },
};
