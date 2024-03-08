import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { Pressable } from 'react-native';
import { Image, Stack, Text, XStack, YStack } from 'tamagui';
import { ZixLinkButton } from '@zix/ui/common';

export function WarningBanner() {
  const router = useRouter();

  const renderOptionText = () => (
    <YStack
      alignItems="flex-end"
      gap="$2"
      $sm={{
        alignItems: 'center',
        gap: '$1',
      }}
    >
      <XStack
        alignItems="flex-end"
        gap="$6"
        $md={{ gap: '$2', alignItems: 'center' }}
      >
        <Text
          fontWeight="800"
          fontSize={20}
          textAlign="center"
          $xs={{
            fontSize: 15,
          }}
        >
          {t('web-home:warningtitle')}
        </Text>
        <Pressable onPress={() => router.push('/client')}>
          <CustomIcon name="large_arrow_right" size="$1" color="$gray10" />
        </Pressable>
      </XStack>
      <Text
        fontWeight="400"
        fontSize={12}
        textAlign="left"
        lineHeight={50}
        $sm={{
          fontSize: 10,
          lineHeight: 25,
          paddingTop: '$1',
          textAlign: 'center',
        }}
      >
        {t('web-home:warningcontent')}
      </Text>
    </YStack>
  );
  return (
    <YStack
      justifyContent="center"
      alignItems="center"
      borderRadius={'$4'}
      height={'$14'}
      marginBottom={'$3'}
      $sm={{
        justifyContent: 'flex-start',
      }}
    >
      <Image
        alt="Banner"
        source={{
          uri: '/images/cheating.png',
          width: '100%',
          height: '100%',
        }}
        resizeMode="cover"
        borderRadius={'$4'}
      />
      <Stack
        flexDirection="row"
        position="absolute"
        width={'100%'}
        justifyContent="space-around"
        $sm={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '$4',
          gap: '$2',
        }}
      >
        {renderOptionText()}
        <ZixLinkButton
          display="warningItem"
          href={'/client'}
          iconAfter={<CustomIcon name="large_arrow_right" size="$1" />}
        >
          {t('web-home:warningbtn')}
        </ZixLinkButton>
      </Stack>
    </YStack>
  );
}
