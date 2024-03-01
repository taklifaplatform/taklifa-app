import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { Stack, Text, Theme, View, XStack, YStack } from 'tamagui';
import { FooterItem } from './FooterItem';

export function Footer() {
  const renderLogo = () => (
    <>
      <XStack
        justifyContent="flex-end"
        paddingHorizontal="$4"
        $md={{ display: 'none' }}
      >
        <CustomIcon name={'web-dark-logo'} width={'134px'} height={'68px'} />
      </XStack>
      <XStack
        justifyContent="flex-end"
        paddingHorizontal="$4"
        $gtMd={{ display: 'none' }}
      >
        <CustomIcon name={'web-dark-logo'} width={'78px'} height={'38px'} />
      </XStack>
    </>
  );

  const renderFollows = () => (
    <Stack
      flexDirection="column"
      flexWrap="wrap"
      gap={'$8'}
      alignItems="flex-end"
    >
      <YStack alignItems="flex-end" gap="$7" $sm={{ gap: '$5' }}>
        <Text color={'$color1'} fontWeight={'bold'}>
          {t('web-home:followus')}
        </Text>
        <XStack
          gap="$4"
          $sm={{ gap: '$2' }}
          $sm={{
            display: 'none',
          }}
        >
          <FooterItem
            icon={
              <CustomIcon name="facebook" size={'$1.5'} color={'$color1'} />
            }
            path={'/'}
          />
          <FooterItem
            icon={
              <CustomIcon name="instagram" size={'$1.5'} color={'$color1'} />
            }
            path={'/'}
          />
          <FooterItem
            icon={
              <CustomIcon name="snapchat" size={'$1.5'} color={'$color1'} />
            }
            path={'/'}
          />
          <FooterItem
            icon={<CustomIcon name="tiktok" size={'$1.5'} color={'$color1'} />}
            path={'/'}
          />
        </XStack>
        <XStack
          gap="$4"
          $gtSm={{
            display: 'none',
          }}
        >
          <FooterItem
            icon={<CustomIcon name="facebook" size={'$1'} color={'$color1'} />}
            path={'/'}
          />
          <FooterItem
            icon={<CustomIcon name="instagram" size={'$1'} color={'$color1'} />}
            path={'/'}
          />
          <FooterItem
            icon={<CustomIcon name="snapchat" size={'$1'} color={'$color1'} />}
            path={'/'}
          />
          <FooterItem
            icon={<CustomIcon name="tiktok" size={'$1'} color={'$color1'} />}
            path={'/'}
          />
        </XStack>
      </YStack>
      <YStack alignItems="flex-end" gap="$6" $sm={{ gap: '$4' }}>
        <Text color={'$color1'}>{t('web-home:download')}</Text>
        <XStack
          gap="$2"
          $sm={{
            display: 'none',
          }}
        >
          <FooterItem
            icon={
              <CustomIcon name="appstore" width={'123px'} height={'35px'} />
            }
            path={'/'}
          />
          <FooterItem
            icon={
              <CustomIcon name="googleplay" width={'123px'} height={'35px'} />
            }
            path={'/'}
          />
        </XStack>
        <XStack
          gap="$2"
          $gtSm={{
            display: 'none',
          }}
        >
          <FooterItem
            icon={<CustomIcon name="appstore" width={'99px'} height={'29px'} />}
            path={'/'}
          />
          <FooterItem
            icon={
              <CustomIcon name="googleplay" width={'99px'} height={'29px'} />
            }
            path={'/'}
          />
        </XStack>
      </YStack>
    </Stack>
  );

  const renderAboutFooter = () => (
    <YStack gap="$4" alignItems="flex-end">
      <Text color={'$color5'} fontWeight={'bold'}>
        {t('web-home:aboutfooter')}
      </Text>
      <FooterItem name={t('web-home:investor')} path={'/'} color={'$color1'} />
      <FooterItem
        name={t('web-home:delivering')}
        path={'/'}
        color={'$color1'}
      />
      <FooterItem
        name={t('web-home:commercial')}
        path={'/'}
        color={'$color1'}
      />
      <FooterItem
        name={t('web-home:certificates')}
        path={'/terms-of-service'}
        color={'$color1'}
      />
      <FooterItem
        name={t('web-home:aboutsawaed')}
        path={'/'}
        color={'$color1'}
      />
    </YStack>
  );

  const renderLegal = () => (
    <YStack gap="$4" alignItems="flex-end">
      <Text color={'$color5'} fontWeight={'bold'}>
        {t('web-home:legal')}
      </Text>
      <FooterItem name={t('web-home:term')} path={'/'} color={'$color1'} />
      <FooterItem name={t('web-home:customer')} path={'/'} color={'$color1'} />
      <FooterItem
        name={t('web-home:privacy')}
        path={'/privacy-policy'}
        color={'$color1'}
      />
      <FooterItem name={t('web-home:cookie')} path={'/'} color={'$color1'} />
      <FooterItem name={t('web-home:sdk')} path={'/'} color={'$color1'} />
    </YStack>
  );

  const renderContact = () => (
    <YStack gap="$4" alignItems="flex-end">
      <Text color={'$color5'} fontWeight={'bold'}>
        {t('web-home:contact')}
      </Text>
      <FooterItem name={t('web-home:jobs')} path={'/jobs'} color={'$color1'} />
      <FooterItem name={t('web-home:aramex')} path={'/'} color={'$color1'} />
      <FooterItem name={t('web-home:blogstix')} path={'/'} color={'$color1'} />
      <FooterItem name={t('web-home:support')} path={'/'} color={'$color1'} />
    </YStack>
  );

  const renderRightReserved = () => (
    <View
      flexDirection="row"
      justifyContent="space-between"
      padding="$4"
      $md={{
        flexDirection: 'column-reverse',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '$6',
      }}
    >
      <Stack
        flexDirection="row"
        flexWrap="wrap"
        gap="$2"
        justifyContent="center"
      >
        <Text color={'$color0'}>© 2024</Text>
        <FooterItem name="Sawaed Logistics" path={'/'} color={'$color5'} />
        <Text color={'$color0'}>{t('web-home:all-rights-reserved')}</Text>
      </Stack>
      <Stack flexDirection="row" flexWrap="wrap" gap="$2" justifyContent="center">
        <FooterItem
          name={t('web-home:term')}
          path={'/terms-of-service'}
          color={'$color0'}
        />
        <Text color={'$color0'}> | </Text>
        <FooterItem
          name={t('web-home:privacy')}
          path={'/privacy-policy'}
          color={'$color0'}
        />
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
              flexDirection: 'column-reverse',
              gap: '$6',
              padding: '$4',
            }}
          >
            {renderFollows()}
            <Stack
              flexDirection="row"
              flexWrap="wrap"
              flex={1}
              gap="$12"
              justifyContent="flex-end"
              $sm={{
                gap: '$4',
              }}
            >
              {renderAboutFooter()}
              {renderLegal()}
              {renderContact()}
            </Stack>
          </View>
        </YStack>
      </Theme>

      {renderRightReserved()}
    </YStack>
  );
}
