import { CustomIcon } from '@zix/ui/icons';
import { XStack } from 'tamagui';

import { useMultiLang } from '@zix/i18n';
import { ZixLinkButton } from '@zix/ui/common';
import { t } from 'i18next';
import { useAuth } from '@zix/services/auth';

export function Header() {
  const { isLoggedIn, redirectUserToActiveDashboard } = useAuth()
  const { activeLang } = useMultiLang();
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
      marginBottom="$4"
    >
      <XStack gap="$2" $lg={{ gap: '$1' }}>
        <ZixLinkButton
          display="headerMenu"
          href={'/'}
          $lg={{ paddingHorizontal: '$4' }}
        >
          {t('web-home:home')}
        </ZixLinkButton>
        <ZixLinkButton
          display="headerMenu"
          href={'/customer/shipments'}
          $lg={{ paddingHorizontal: '$4' }}
        >
          {t('web-home:payments')}
        </ZixLinkButton>
        <ZixLinkButton
          display="headerMenu"
          href={'/customer/orders'}
          $lg={{ paddingHorizontal: '$4' }}
        >
          {t('web-home:followers')}
        </ZixLinkButton>
        <ZixLinkButton
          display="headerMenu"
          href={'/jobs'}
          $lg={{ paddingHorizontal: '$4' }}
        >
          {t('web-home:works')}
        </ZixLinkButton>
      </XStack>
      <CustomIcon name={`web_logo_${activeLang}`} size={'$9'} />
      <XStack gap="$0">
        <ZixLinkButton
          display="headerMenu"
          href={'/jobs'}
          icon={<CustomIcon name={'search'} size="$1" />}
          $lg={{ paddingHorizontal: '$4' }}
        >
          {t('web-home:search')}
        </ZixLinkButton>
        <ZixLinkButton
          display="headerMenu"
          href={'/contact'}
          icon={<CustomIcon name={'ringing'} size="$1" />}
          $lg={{ paddingHorizontal: '$4' }}
        >
          {t('web-home:call')}
        </ZixLinkButton>
        {
          !isLoggedIn && (
            <ZixLinkButton
              display="headerMenu"
              href={'/auth/login'}
              icon={<CustomIcon name={'account'} size="$1" />}
              $lg={{ paddingHorizontal: '$4' }}
            >
              {t('web-home:signup')}
            </ZixLinkButton>
          )
        }

        {
          isLoggedIn && (
            <ZixLinkButton
              display="headerMenu"
              href={'/account'}
              onPress={redirectUserToActiveDashboard}
              icon={<CustomIcon name={'account'} size="$1" />}
              $lg={{ paddingHorizontal: '$4' }}
            >
              {t('web-home:account')}
            </ZixLinkButton>
          )
        }

      </XStack>
    </XStack>
  );
}
