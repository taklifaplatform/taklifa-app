export type AUTH_ROLE_TYPE =
  | 'customer'
  | 'company_owner'
  | 'company_manager'
  | 'company_driver'
  | 'solo_driver';

export const USER_ROLES = {
  customer: 'customer',
  company_owner: 'company_owner',
  company_manager: 'company_manager',
  company_driver: 'company_driver',
  solo_driver: 'solo_driver',
} as const;
