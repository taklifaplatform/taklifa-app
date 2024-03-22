import { CustomIcon } from '@zix/ui/icons';
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
        display="headerMenu"
        href={'/'}
      >
        <Text>{t('web-home:home')}</Text>
      </ZixLinkButton>
      <ZixLinkButton
        display="headerMenu"
        href={'/customer/shipments'}
      >
        <Text>{t('web-home:payments')}</Text>
      </ZixLinkButton>
      <ZixLinkButton
        display="headerMenu"
        href={'/customer/orders'}
        $lg={{ paddingHorizontal: '$4' }}
      >
        <Text>  {t('web-home:followers')}</Text>
      </ZixLinkButton>
      <ZixLinkButton
        display="headerMenu"
        href={'/jobs'}
        $lg={{ paddingHorizontal: '$4' }}
      >
        <Text>{t('web-home:works')}</Text>
      </ZixLinkButton>
    </XStack>
  );
  const renderLogo = () => (
    <CustomIcon name={`web_logo_${activeLang}`} size={'$9'} />
  );
  const renderSearch = () => (
    <ZixLinkButton
      display="headerMenu"
      href={'/jobs'}
      icon={<CustomIcon name={'search'} size="$1" />}
      $lg={{ paddingHorizontal: '$4' }}
    >
      <Text>{t('web-home:search')}</Text>
    </ZixLinkButton>
  );
  const renderCall = () => (
    <ZixLinkButton
      display="headerMenu"
      href={'/contact'}
      icon={<CustomIcon name={'ringing'} size="$1" />}
      $lg={{ paddingHorizontal: '$4' }}
    >
      <Text>{t('web-home:call')}</Text>
    </ZixLinkButton>
  );
  const renderSignup = () => (
    <>
      {
        !isLoggedIn && (
          <ZixLinkButton
            display="headerMenu"
            href={'/auth/login'}
            icon={<CustomIcon name={'account'} size="$1" />}
            $lg={{ paddingHorizontal: '$4' }}
          >
            <Text> {t('web-home:signup')}</Text>
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
            <Text> {t('web-home:signup')}</Text>
          </ZixLinkButton>
        )
      }
    </>
  );
  return (
    <XStack
      $sm={{ display: 'none' }}
      justifyContent="space-between"
      backgroundColor='$white1'
      alignItems="center"
      borderTopWidth={1}
      borderTopColor={'$gray7'}
      paddingHorizontal="$4"
      height={80}
    >
      {renderMenuItems()}
      {renderLogo()}
      <XStack >
        {renderSearch()}
        {renderCall()}
        {renderSignup()}
      </XStack>
    </XStack>
  );
}
