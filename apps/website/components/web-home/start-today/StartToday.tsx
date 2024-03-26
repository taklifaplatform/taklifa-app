import { useMultiLang } from '@zix/i18n';
import { ZixLinkButton } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { Pressable } from 'react-native';
import { Image, Stack, Text, XStack, YStack } from 'tamagui';

export function StartToday() {
  const { activeLang } = useMultiLang();
  const router = useRouter();
  const renderTextStartToday = () => (
    <YStack
      pos={'absolute'}
      width={'70%'}
      gap="$6"
      padding="$4"
      $sm={{
        gap: '$2',
        padding: '$2',
      }}
      $xs={{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Text
        fontWeight={'800'}
        fontSize={45}
        $md={{
          fontSize: 30,
          paddingBottom: '$3',
        }}
        $sm={{
          fontSize: 15,
          paddingBottom: '$1',
        }}
      >
        {t('web-home:banner-5')}
      </Text>
      <Text
        fontWeight="400"
        fontSize={23}
        lineHeight={40}
        textAlign={activeLang === 'en' ? 'left' : 'right'}
        paddingBottom="$6"
        $md={{
          fontSize: 15,
          lineHeight: 25,
          paddingBottom: '$3',
        }}
        $sm={{
          fontSize: 10,
          lineHeight: 15,
          paddingBottom: '$1',
        }}
        $xs={{
          textAlign: 'center',
        }}
      >
        {t('web-home:content-5')}
      </Text>
      <Text
        fontWeight="600"
        fontSize={20}
        paddingBottom="$3"
        $sm={{
          fontSize: 15,
        }}
      >
        {t('web-home:download')}
      </Text>
      <XStack gap="$2">
        <ZixLinkButton
          menuItem
          href="/"
        >
          <Image
            alt="Google Play"
            source={{
              uri: '/images/googlePlay.png',
              width: 200,
              height: 60,
            }}
            $sm={{
              width: 100,
            }}
            resizeMode="contain"
          />
        </ZixLinkButton>
        <ZixLinkButton
          menuItem
          href="/"
        >
          <Image
            alt="App Store"
            source={{
              uri: '/images/appStore.png',
              width: 250,
              height: 60,
            }}
            $sm={{
              width: 90,
            }}
            resizeMode="contain"
          />
        </ZixLinkButton>
      </XStack>


      {/* <Stack flexDirection="row" gap="$4" $gtSm={{ display: 'none' }}>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="google_play" size={'$11'} />
        </Pressable>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="app_store" size={'$11'} />
        </Pressable>
      </Stack>
      <Stack flexDirection="row" gap="$4" $sm={{ display: 'none' }}>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="google_play" size={'$14'} />
        </Pressable>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="app_store" size={'$14'} />
        </Pressable>
      </Stack> */}
    </YStack>
  );
  return (

    <Stack
      theme={'accent'}
      height={560}
      $md={{ height: 400 }}
      $sm={{ height: 200 }}
      backgroundColor={'$color6'}
      borderRadius={'$4'}
      justifyContent='center'
    >
      <Image
        alt="Banner"
        borderRadius={'$4'}
        source={{
          uri: `/images/banner-4-${activeLang}.png`,
        }}
        width="100%"
        height="100%"
        resizeMode="responsive"
        $xs={{ display: 'none' }}
      />
      {renderTextStartToday()}
    </Stack>

  );
}
