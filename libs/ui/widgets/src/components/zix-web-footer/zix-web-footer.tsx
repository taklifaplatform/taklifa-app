import { Instagram } from '@tamagui/lucide-icons';
import { Facebook } from '@tamagui/lucide-icons';
import { useMultiLang } from '@zix/i18n';
import { ZixContainer, ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { Image, Stack, Text, Theme, View, XStack, YStack } from 'tamagui';

export const ZixWebFooter = () => {
  const { activeLang } = useMultiLang();
  const renderLogo = () => (
    <View paddingHorizontal="$3">
      <CustomIcon name={`web_logo_${activeLang}`} size={'$12'} color="$color2" />
    </View>
  );
  const renderFollows = () => (
    <Stack
      flexDirection="column"
      flexWrap="wrap"
      gap={'$8'}
      justifyContent="space-between"
      $sm={{
        flexDirection: 'row',
        gap: '$4',
        marginTop: '$6',
      }}
    >
      {/* followus */}
      <YStack
        gap="$4"
        $md={{
          gap: '$3',
        }}
      >
        <Text color={'$color2'} fontWeight={'bold'}>
          {t('web-home:followus')}
        </Text>
        <XStack gap="$1">
          <ZixLinkButton
            menuItem
            href={'https://www.tiktok.com/@sawaeed.app'}
            icon={<CustomIcon name="tik_tok" size={'$1.5'} color='$color2' />}
          />
          <ZixLinkButton
            menuItem
            href={'https://www.snapchat.com/add/sawaeed.app?share_id=iDs1PAy9ZJw&locale=en-US'}
            icon={<CustomIcon name="snapchat" size={'$1.5'} color='$color2' />}
          />
          <ZixLinkButton
            menuItem
            href={'https://www.instagram.com/sawaeed.app'}
            icon={<Instagram size='$1.5' color='$color2' />}
          />
          <ZixLinkButton
            menuItem
            href={'https://www.facebook.com/people/%D8%B3%D9%88%D8%A7%D8%B9%D8%AF-%D8%A7%D9%84%D9%84%D9%88%D8%AC%D8%B3%D8%AA%D9%8A%D8%A9/pfbid034HMQXwBev6dQNzo11Rmcih9Q8j2FU6S4Z9vhxPpcAiEWB3othkiHc4siBteJeFEl/?rdid=EvToBViZdnBkK9f1&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1FkReVQwMD%2F'}
            icon={<Facebook size='$1.5' color='$color2' />}
          />
        </XStack>
      </YStack>
      {/* download */}
      <YStack
        gap="$4"
        alignItems="flex-start"
        $md={{
          gap: '$2',
        }}
      >
        <Text
          color={'$color2'}
          $sm={{
            fontSize: '$1',
          }}
        >{t('web-home:download')}</Text>
        <XStack gap="$2">
          <ZixLinkButton
            menuItem
            href="https://play.google.com/store/apps/details?id=app.sawaeed"
          >
            <Image
              source={{
                uri: '/images/googlePlay.png',
                width: 135,
                height: 50,
              }}
              $sm={{
                width: 100,
              }}
              resizeMode="contain"
            />
          </ZixLinkButton>
          <ZixLinkButton
            menuItem
            href="https://apps.apple.com/tn/app/sawaeed/id6720725925"
          >
            <Image
              source={{
                uri: '/images/appStore.png',
                width: 120,
                height: 50,
              }}
              $sm={{
                width: 90,
              }}
              resizeMode="contain"
            />
          </ZixLinkButton>
        </XStack>
      </YStack>
    </Stack>
  );
  const renderAboutFooter = () => (
    <YStack gap="$7" theme={'accent'}>
      <Text color={'$color8'} fontWeight={'bold'}>
        {t('web-home:aboutfooter')}
      </Text>
      <YStack gap="$1">
        {/* <ZixLinkButton menuItem href={'/'} >
          <Text color={'$color2'}>{t('web-home:investor')}</Text>
        </ZixLinkButton> */}
        {/* <ZixLinkButton menuItem href={'/'}>
          <Text color={'$color2'}>{t('web-home:delivering')}</Text>
        </ZixLinkButton> */}
        <ZixLinkButton menuItem href={'/about/commercial'}>
          <Text color={'$color2'}>{t('web-home:commercial')}</Text>
        </ZixLinkButton>
        <ZixLinkButton menuItem href={'/terms-of-service'}>
          <Text color={'$color2'}>{t('web-home:certificates')}</Text>
        </ZixLinkButton>
        <ZixLinkButton menuItem href={'/about'} color={'$color2'}>
          <Text color={'$color2'}>{t('web-home:aboutsawaed')}</Text>
        </ZixLinkButton>
      </YStack>
    </YStack>
  );
  const renderLegal = () => (
    <YStack gap="$7" alignItems="flex-start" theme={'accent'}>
      <Text color={'$color8'} fontWeight={'bold'}>
        {t('web-home:legal')}
      </Text>
      <YStack gap="$1">
        <ZixLinkButton menuItem href={'/terms-of-service'}>
          <Text color={'$color2'}>{t('web-home:term')}</Text>
        </ZixLinkButton>
        <ZixLinkButton menuItem href={'/'}>
          <Text color={'$color2'}>{t('web-home:customer')}</Text>
        </ZixLinkButton>
        <ZixLinkButton menuItem href={'/privacy-policy'} >
          <Text color={'$color2'}>{t('web-home:privacy')}</Text>
        </ZixLinkButton>
        <ZixLinkButton menuItem href={'/'}>
          <Text color={'$color2'}>{t('web-home:cookie')}</Text>
        </ZixLinkButton>
        <ZixLinkButton menuItem href={'/'}>
          <Text color={'$color2'}>{t('web-home:sdk')}</Text>
        </ZixLinkButton>
      </YStack>
    </YStack>
  );
  const renderContact = () => (
    <YStack gap="$7" alignItems="flex-start" theme={'accent'}>
      <Text color={'$color8'} fontWeight={'bold'}>
        {t('web-home:contact')}
      </Text>
      <YStack gap="$1">
        <ZixLinkButton menuItem href={'/jobs'}>
          <Text color={'$color2'}>{t('web-home:jobs')}</Text>
        </ZixLinkButton>
        <ZixLinkButton menuItem href={'/'}>
          <Text color={'$color2'}>{t('web-home:aramex')}</Text>
        </ZixLinkButton>
        <ZixLinkButton menuItem href={'/'}>
          <Text color={'$color2'}>{t('web-home:blogstix')}</Text>
        </ZixLinkButton>
        <ZixLinkButton menuItem href={'/'}>
          <Text color={'$color2'}>{t('web-home:support')}</Text>
        </ZixLinkButton>
      </YStack>
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
        <ZixLinkButton
          linkItem
          href={'/terms-of-service'}
          linkItem
          color={'$color12'}
          borderColor={'$color12'}
          borderBottomWidth={'$0.25'}
          padding={'$0'}
        >
          {t('web-home:term')}
        </ZixLinkButton>
        <Text color={'$color0'}> | </Text>
        <ZixLinkButton
          linkItem
          href={'/privacy-policy'}
          color={'$color12'}
          borderColor={'$color12'}
          borderBottomWidth={'$0.25'}
          padding={'$0'}
        >
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
        <Text color={'$color0'}>{t('web-home:all-rights-reserved')}</Text>
        <ZixLinkButton
          linkItem
          href={'/'}
          color={'$color5'}
          borderColor={'$color5'}
          borderBottomWidth={'$1'}
          padding={'$0'}
        >
          {t('web-home:sawaed_logistics')}
        </ZixLinkButton>
        <Text color={'$color0'}>© 2024</Text>
      </Stack>
    </View>
  );

  return (
    <ZixContainer>
      <YStack>
        <Theme name="light">
          <YStack backgroundColor={'$color'} padding="$4" borderRadius="$4">
            {renderLogo()}
            <View
              flexDirection="row"
              padding="$4"
              $lg={{
                flexDirection: 'column',
                gap: '$3',
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
                {renderContact()}
                {renderLegal()}
                {renderAboutFooter()}
              </Stack>
              {renderFollows()}
            </View>
          </YStack>
        </Theme>
        {renderRightReserved()}
      </YStack>
    </ZixContainer>
  );
}

export default ZixWebFooter;
