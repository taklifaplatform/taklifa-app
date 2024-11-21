import { CustomIcon } from '@zix/ui/icons';
import { Search, UserCircle } from '@tamagui/lucide-icons';
import { XStack, Text } from 'tamagui';
import { useMultiLang } from '@zix/i18n';
import { ZixLinkButton } from '@zix/ui/common';
import { t } from 'i18next';
import { useAuth } from '@zix/services/auth';

export function Header() {
  const { isLoggedIn, redirectUserToActiveDashboard } = useAuth()
  const { activeLang } = useMultiLang();
  const renderMenuItems = () => (
    <XStack $lg={{ gap: '$1' }}>
      <ZixLinkButton
        backgroundColor={'$color6'}
        headerMenu
        href={'/'}
      >
        {t('web-home:home')}
      </ZixLinkButton>
      <ZixLinkButton
        headerMenu
        href={'/app/shipments'}
      >
        {t('web-home:payments')}
      </ZixLinkButton>
      <ZixLinkButton
        headerMenu
        href={'/app/shipments'}
        $lg={{ paddingHorizontal: '$4' }}
      >
        {t('web-home:followers')}
      </ZixLinkButton>
      <ZixLinkButton
        headerMenu
        href={'/jobs'}
        $lg={{ paddingHorizontal: '$4' }}
      >
        {t('web-home:works')}
      </ZixLinkButton>
    </XStack>
  );
  const renderLogo = () => (
    <CustomIcon name={`web_logo_${activeLang}`} size={'$9'} />
  );
  const renderSearch = () => (
    <ZixLinkButton
      headerMenu
      href={'/jobs'}
      icon={<Search size="$1" />}
      $lg={{ paddingHorizontal: '$4' }}
    >
      {t('web-home:search')}
    </ZixLinkButton>
  );
  const renderCall = () => (
    <ZixLinkButton
      headerMenu
      href={'/contact'}
      icon={<CustomIcon name={'ringing'} size="$1" />}
      $lg={{ paddingHorizontal: '$4' }}
    >
      {t('web-home:call')}
    </ZixLinkButton>
  );
  const renderSignup = () => (
    <>
      {
        !isLoggedIn && (
          <ZixLinkButton
            headerMenu
            href={'/auth/login'}
            icon={<UserCircle size="$1" />}
            $lg={{ paddingHorizontal: '$4' }}
          >
            {t('web-home:signup')}
          </ZixLinkButton>
        )
      }
      {
        isLoggedIn && (
          <ZixLinkButton
            headerMenu
            href={'/account'}
            onPress={redirectUserToActiveDashboard}
            icon={<UserCircle size="$1" />}
            $lg={{ paddingHorizontal: '$4' }}
          >
            {t('web-home:signup')}
          </ZixLinkButton>
        )
      }
    </>
  );
  return (
    <XStack
      $sm={{ display: 'none' }}
      justifyContent="space-between"
      backgroundColor='$color1'
      alignItems="center"
      borderTopWidth='$1'
      borderTopColor={'$gray7'}
      paddingHorizontal="$4"
      height={80}
    >
      {renderMenuItems()}
      {renderLogo()}
      <XStack >
        {renderSearch()}
        {renderCall()}
        {!isLoggedIn && renderSignup()}
      </XStack>
    </XStack>
  );
}
