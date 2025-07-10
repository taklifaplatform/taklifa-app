export type AUTH_ROLE_TYPE =
  | 'customer'
  | 'company_owner'
  | 'service_provider';

export const USER_ROLES = {
  customer: 'customer',
  company_owner: 'company_owner',
  service_provider: 'service_provider',
} as const;

  export const DRIVER_ROLES: AUTH_ROLE_TYPE[] = [
    USER_ROLES.service_provider,
  ];

export const COMPANY_ROLES: AUTH_ROLE_TYPE[] = [
  USER_ROLES.service_provider,
  USER_ROLES.company_owner,
];

export const COMPANY_MANAGER_ROLES: AUTH_ROLE_TYPE[] = [
  USER_ROLES.service_provider,
  USER_ROLES.company_owner,
];

export type COMPANY_ROLE_TYPES =
  | 'company_owner'
  | 'service_provider';
