import { useMultiLang } from '@zix/i18n';
import { ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { Stack, Text, Theme, View, XStack, YStack } from 'tamagui';

export function Footer() {
  const { activeLang } = useMultiLang();
  const renderLogo = () => (
    <View paddingHorizontal="$3">
      <CustomIcon name={`web_logo_${activeLang}`} size={'$9'} color="$color1" />
    </View>
  );

  const renderFollows = () => (
    <Stack
      flexDirection="column"
      flexWrap="wrap"
      gap={'$8'}
      alignItems="flex-start"
    >
      <Text color={'$color1'} fontWeight={'bold'}>
        {t('web-home:followus')}
      </Text>
      <XStack gap="$4">
        <ZixLinkButton
          display="menuItem"
          unstyled
          icon={<CustomIcon name="facebook" size={'$1.5'} color={'$color1'} />}
          href={'/'}
        />
        <ZixLinkButton
          display="menuItem"
          unstyled
          icon={<CustomIcon name="instagram" size={'$1.5'} color={'$color1'} />}
          href={'/'}
        />
        <ZixLinkButton
          display="menuItem"
          unstyled
          icon={<CustomIcon name="snapchat" size={'$1.5'} color={'$color1'} />}
          href={'/'}
        />
        <ZixLinkButton
          display="menuItem"
          unstyled
          icon={<CustomIcon name="tik_tok" size={'$1.5'} color={'$color1'} />}
          href={'/'}
        />
      </XStack>

      <Text color={'$color1'}>{t('web-home:download')}</Text>

      <Stack gap="$2" flexDirection="row" flexWrap="wrap" alignItems=''>
        <ZixLinkButton
          display="menuItem"
          unstyled
          icon={<CustomIcon name="app_store" width="$13" height="$5" />}
          scaleIcon={10}
          href={'/'}
        />
        <ZixLinkButton
          display="menuItem"
          unstyled
          icon={<CustomIcon name="google_play" width={'$13'} height={'$5'} />}
          scaleIcon={10}
          href="/"
        />
      </Stack>
    </Stack>
  );

  const renderAboutFooter = () => (
    <YStack gap="$4">
      <Text color={'$color5'} fontWeight={'bold'}>
        {t('web-home:aboutfooter')}
      </Text>
      <ZixLinkButton display="menuItem" href={'/'}>
        {t('web-home:investor')}
      </ZixLinkButton>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:investor')}
      </ZixLinkButton>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:delivering')}
      </ZixLinkButton>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:commercial')}
      </ZixLinkButton>
      <ZixLinkButton
        display="menuItem"
        href={'/terms-of-service'}
        color={'$color1'}
      >
        {t('web-home:certificates')}
      </ZixLinkButton>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:aboutsawaed')}
      </ZixLinkButton>
    </YStack>
  );

  const renderLegal = () => (
    <YStack gap="$4" alignItems="flex-start">
      <Text color={'$color5'} fontWeight={'bold'}>
        {t('web-home:legal')}
      </Text>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:term')}
      </ZixLinkButton>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:customer')}
      </ZixLinkButton>
      <ZixLinkButton
        display="menuItem"
        href={'/privacy-policy'}
        color={'$color1'}
      >
        {t('web-home:privacy')}
      </ZixLinkButton>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:cookie')}
      </ZixLinkButton>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:sdk')}
      </ZixLinkButton>
    </YStack>
  );

  const renderContact = () => (
    <YStack gap="$4" alignItems="flex-start">
      <Text color={'$color5'} fontWeight={'bold'}>
        {t('web-home:contact')}
      </Text>
      <ZixLinkButton display="menuItem" href={'/jobs'} color={'$color1'}>
        {t('web-home:jobs')}
      </ZixLinkButton>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:aramex')}
      </ZixLinkButton>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:blogstix')}
      </ZixLinkButton>
      <ZixLinkButton display="menuItem" href={'/'} color={'$color1'}>
        {t('web-home:support')}
      </ZixLinkButton>
    </YStack>
  );

  const renderRightReserved = () => (
    <View
      flexDirection="row"
      justifyContent="space-between"
      padding="$4"
      $md={{
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '$6',
      }}
    >
      <Stack
        flexDirection="row"
        flexWrap="wrap"
        gap="$2"
        alignItems="center"
        justifyContent="center"
      >
        <ZixLinkButton display="linkItem" href={'/terms-of-service'}>
          {t('web-home:term')}
        </ZixLinkButton>
        <Text color={'$color0'}> | </Text>
        <ZixLinkButton display="linkItem" href={'/privacy-policy'}>
          {t('web-home:privacy')}
        </ZixLinkButton>
      </Stack>
      <Stack
        flexDirection="row"
        flexWrap="wrap"
        gap="$2"
        justifyContent="center"
        alignItems="center"
      >
        <Text color={'$color0'}>© 2024</Text>
        <ZixLinkButton display="linkItem" href={'/'} color={'$color5'}>
          Sawaed Logistics
        </ZixLinkButton>
        <Text color={'$color0'}>{t('web-home:all-rights-reserved')}</Text>
      </Stack>
    </View>
  );

  return (
    <YStack>
      <Theme name="light">
        <YStack backgroundColor={'$color'} padding="$4" borderRadius="$4">
          {renderLogo()}
          <View
            flexDirection="row"
            padding="$4"
            $lg={{
              flex: 1,
              flexDirection: 'column',
              gap: '$6',
              padding: '$4',
            }}
          >
            <Stack
              flexDirection="row"
              flexWrap="wrap"
              flex={1}
              gap="$12"
              justifyContent="flex-start"
              $sm={{
                gap: '$4',
              }}
            >
              {renderAboutFooter()}
              {renderLegal()}
              {renderContact()}
            </Stack>
            {renderFollows()}
          </View>
        </YStack>
      </Theme>

      {renderRightReserved()}
    </YStack>
  );
}
