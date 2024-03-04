import { useMultiLang } from '@zix/i18n';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { Pressable } from 'react-native';
import { Image, Stack, Text, Theme, YStack } from 'tamagui';

export function StartToday() {
  const { activeLang } = useMultiLang();
  const router = useRouter();

  const renderTextStartToday = () => (
    <YStack
      pos={'absolute'}
      flexDirection="column"
      flexWrap="wrap"
      left={activeLang === 'en' ? '0' : 'auto'}
      right={activeLang === 'en' ? 'auto' : '0'}
      alignItems="flex-end"
      width={'70%'}
      gap="$4"
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
        fontSize={25}
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
          fontSize: 20,
          paddingVertical: '$4',
        }}
      >
        {t('web-home:download')}
      </Text>
      <Stack flexDirection="row" gap="$4" $gtSm={{ display: 'none' }}>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="googleplay" size={'$11'} />
        </Pressable>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="appstore" size={'$11'} />
        </Pressable>
      </Stack>
      <Stack flexDirection="row" gap="$4" $sm={{ display: 'none' }}>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="googleplay" size={'$14'} />
        </Pressable>
        <Pressable onPress={() => router.push('/')}>
          <CustomIcon name="appstore" size={'$14'} />
        </Pressable>
      </Stack>
    </YStack>
  );
  return (
    <Theme name="light">
      <Stack
        height={'542px'}
        $md={{ height: '400px' }}
        $sm={{ height: '200px' }}
      >
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-4-${activeLang}.png`,
          }}
          width="100%"
          height="100%"
          resizeMode="cover"
          $xs={{ display: 'none' }}
        />
        {renderTextStartToday()}
      </Stack>
    </Theme>
  );
}
