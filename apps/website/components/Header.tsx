import { CustomIcon } from '@zix/ui/icons';
import { XStack } from 'tamagui';

import { t } from 'i18next';
import { HeaderMenuItem } from './HeaderMenuItem';

export function Header() {
  return (
    <XStack
      $sm={{ display: 'none' }}
      justifyContent="space-around"
      backgroundColor={'$color1'}
      alignItems="center"
      borderBottomLeftRadius={'$4'}
      borderBottomRightRadius={'$4'}
      borderTopWidth={2}
      borderTopColor={'$gray7'}
      marginBottom="$4"
    >
      <XStack gap="$1" $lg={{ display: 'none' }}>
        <HeaderMenuItem name={t('web-home:signup')} path={'/login'} icon={<CustomIcon name={'account'} size="$1" />} />
        <HeaderMenuItem name={t('web-home:call')} path={'/call'} icon={<CustomIcon name={'rigning'} size="$1" />} />
        <HeaderMenuItem name={t('web-home:search')} path={'/search'} icon={<CustomIcon name={'search'} size="$1" />} />
      </XStack>
      {/* Logo */}
        <CustomIcon name={'weblogo'} size={'$9'} />
      
      <XStack gap="$1">
        <HeaderMenuItem name={t('web-home:works')} path={'/works'} />
        <HeaderMenuItem name={t('web-home:followers')} path={'/followers'} />
        <HeaderMenuItem name={t('web-home:payments')} path={'/payments'} />
        <HeaderMenuItem name={t('web-home:home')} path={'/'} />
      </XStack>
    </XStack>
  );
}
