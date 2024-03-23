import { useAuth } from '@zix/services/auth';
import { t } from 'i18next';
import { useMemo } from 'react';

export function useAppBottomBarMenu() {
  const { getUrlPrefix } = useAuth();

  const menuItems = useMemo(
    () => [
      {
        name: 'home',
        title: t('navigation:customer-dashboard.home'),
        icon: 'home',
        href: `${getUrlPrefix}/`,
      },
      {
        name: 'shipments',
        title: t('navigation:customer-dashboard.orders'),
        icon: 'orders',
        href: `${getUrlPrefix}/shipments`,
      },
      {
        name: 'create-shipment',
        title: '',
        href: `${getUrlPrefix}/create-shipment`,
        // icon: PlusButton,
      },
      {
        name: 'org',
        title: t('navigation:company-dashboard.data'),
        icon: 'apps',
        href: `${getUrlPrefix}/org`,
      },
      {
        name: 'stores',
        title: t('navigation:customer-dashboard.store'),
        icon: 'store',
        href: `${getUrlPrefix}/stores`,
      },
    ],
    [getUrlPrefix],
  );

  return {
    menuItems,
  };
}
