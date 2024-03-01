import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { useRouter } from 'next/router';
import { Pressable } from 'react-native';
import { Image, Stack, Text, XStack, YStack } from 'tamagui';
import { ButtonItem } from '../../ButtonItem';

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
        <Pressable onPress={() => router.push('/client')}>
          <CustomIcon name="large_arrow_right" size="$1" color="$gray10" />
        </Pressable>
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
      </XStack>
      <Text
        fontWeight="400"
        fontSize={12}
        textAlign="left"
        lineHeight={50}
        $sm={{
          fontSize: 10,
          lineHeight: 25,
          paddingTop: '$3',
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
      height={181}
      marginBottom={'$3'}
      $sm={{
        height: '200px',
        justifyContent: 'flex-start',
        marginBottom: '0',
      }}
    >
      <Image
        alt="Banner"
        source={{
          uri: '/images/cheating.png',
          width: '100%',
          height: '180px',
        }}
        resizeMode="cover"
        borderRadius={'$4'}
      />
      <Stack
        flexDirection="row-reverse"
        position="absolute"
        width={'100%'}
        justifyContent="space-around"
        $sm={{
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '$3',
          gap: '$3',
        }}
      >
        {renderOptionText()}
        <ButtonItem
          backgroundColor="red"
          paddingVertical="$3"
          paddingHorizontal="$6"
          width="100%"
          $xs={{
            width: '100%',
            paddingVertical: '$2',
            paddingHorizontal: '$10',
          }}
          iconAfter={
            <CustomIcon name="large_arrow_right" size="$1" color={'$color1'} />
          }
          name={t('web-home:warningbtn')}
          color="$color1"
        />
      </Stack>
    </YStack>
  );
}
