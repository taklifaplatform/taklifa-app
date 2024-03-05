import { CustomIcon } from '@zix/ui/icons';
import { XStack, useTheme } from 'tamagui';

import { t } from 'i18next';
import { HeaderMenuItem } from './HeaderMenuItem';

export function Header() {
  const theme = useTheme();
  return (
    <XStack
      $sm={{ display: 'none' }}
      justifyContent="space-between"
      backgroundColor={'$color1'}
      alignItems="center"
      borderBottomLeftRadius={'$4'}
      borderBottomRightRadius={'$4'}
      borderTopWidth={2}
      borderTopColor={'$gray7'}
      paddingHorizontal="$3"
      paddingVertical="$1"
      marginBottom="$4"
    >
      <XStack gap="$1">
        <HeaderMenuItem name={t('web-home:home')} path={'/'} />
        <HeaderMenuItem name={t('web-home:payments')} path={'/customer/shipments'} />
        <HeaderMenuItem name={t('web-home:followers')} path={'/customer/orders'} $md={{ display: 'none' }} />
        <HeaderMenuItem name={t('web-home:works')} path={'/jobs'} $lg={{ display: 'none' }} />
      </XStack>

      {
        !theme.dark ? (
          <CustomIcon name={'weblogo'} size={'$10'} />
        ) : (
          <CustomIcon name={'web-dark-logo'} size={'$10'} />
        )
      }

      <XStack gap="$1">
        <HeaderMenuItem name={t('web-home:search')} path={'/jobs'} icon={<CustomIcon name={'search'} size="$1" />} $lg={{ display: 'none' }} />
        <HeaderMenuItem name={t('web-home:call')} path={'/contact'} icon={<CustomIcon name={'rigning'} size="$1" />} $md={{ display: 'none' }} />
        <HeaderMenuItem name={t('web-home:signup')} path={'/auth/login'} icon={<CustomIcon name={'account'} size="$1" />} />
      </XStack>
    </XStack>
  );
}
