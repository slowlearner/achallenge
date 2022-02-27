import {
  ASYNC_RBAC_REQUEST_FILTER,
  IStorageRbac,
  RBAC_REQUEST_FILTER,
} from 'nestjs-rbac';

export const RBAC: IStorageRbac = {
  roles: ['administrator', 'user'],
  permissions: {
    images: ['create', 'update', 'delete', 'get', 'list'],
    accounts: ['create', 'update', 'delete', 'get'],
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

export const ROLE_USER = 'user';
export const ROLE_ADMINISTRATOR = 'administrator';
