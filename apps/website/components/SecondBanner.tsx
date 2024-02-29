import React from 'react';
import { YStack, Text, XStack, Button, Stack } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { Image, Pressable } from 'react-native';
import { useMultiLang } from '@zix/i18n';
import { useRouter } from 'next/router';

export function SecondBanner() {
  const { activeLang } = useMultiLang();
  const router = useRouter();

  const renderImageBackground = () => (
    <>
      <Stack
        $gtMd={{
          height: '397px',
        }}
        $md={{
          height: '397px',
        }}
        $sm={{
          display: 'none',
        }}
      >
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-2-${activeLang}.png`,
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </Stack>
      <Stack
        width={'100%'}
        $gtSm={{
          display: 'none',
        }}
        $sm={{
          height: '250px',
        }}
        $xs={{
          display: 'none',
        }}
      >
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-2-${activeLang}.png`,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </Stack>
      <Stack
        width={'100%'}
        $gtXs={{
          display: 'none',
        }}
        $xs={{
          height: '130px',
        }}
      >
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-2-${activeLang}.png`,
          }}
          style={{
            width: '100%',
            height: '100%',
          }}
          resizeMode="cover"
        />
      </Stack>
    </>
  );

  const renderWelcomeText = () => (
    <YStack alignItems="center" w={'100%'} paddingVertical="$2">
      <XStack
        alignItems="flex-end"
        gap="$6"
        $md={{ gap: '$4' }}
        $xs={{ gap: '$2' }}
      >
        <Pressable onPress={() => router.push('/client')}>
          <CustomIcon name="large_arrow_right" size="$1" color="$gray10" />
        </Pressable>
        <Text
          fontWeight="800"
          fontSize={30}
          textAlign="center"
          $xs={{
            fontSize: 15,
          }}
        >
          {t('web-home:banner-2')}
        </Text>
      </XStack>
      <Text
        fontWeight="400"
        fontSize={25}
        textAlign="center"
        suppressHighlighting={true}
        width="80%"
        paddingTop="$6"
        lineHeight={50}
        $sm={{
          fontSize: 15,
          lineHeight: 25,
          paddingTop: '$3',
          textAlign: 'center',
        }}
      >
        {t('web-home:content-2')}
      </Text>
    </YStack>
  );

  const renderIcons = () => (
    <>
      <XStack
        position="absolute"
        w={'100%'}
        top={'-20px'}
        alignItems="center"
        justifyContent="center"
        gap="$4"
        $gtXs={{
          display: 'none',
        }}
      >
        <YStack alignItems="center" gap="$2">
          <CustomIcon name="companyshipping" size="$3" />
          <Text fontWeight="600" fontSize={12}>
            {t('web-home:company')}
          </Text>
        </YStack>
        <YStack alignItems="center" gap="$2">
          <CustomIcon name="shipping" size="$3" />
          <Text fontWeight="600" fontSize={12}>
            {t('web-home:driver')}
          </Text>
        </YStack>
        <YStack alignItems="center" gap="$2">
          <CustomIcon name="client" size="$3" />
          <Text fontWeight="600" fontSize={12}>
            {t('web-home:client')}
          </Text>
        </YStack>
      </XStack>
      <XStack
        position="absolute"
        w={'100%'}
        top={'-40px'}
        alignItems="center"
        justifyContent="center"
        gap="$13"
        $sm={{
          gap: '$4',
        }}
        $xs={{
          display: 'none',
        }}
      >
        
        
        <YStack alignItems="center" gap="$2">
          <CustomIcon name="companyshipping" size="$6" />
          <Text
            fontWeight="600"
            $sm={{
              fontSize: '$2',
            }}
          >
            {t('web-home:company')}
          </Text>
        </YStack>
        <YStack alignItems="center" gap="$2">
          <CustomIcon name="shipping" size="$6" />
          <Text
            fontWeight="600"
            $sm={{
              fontSize: '$2',
            }}
          >
            {t('web-home:driver')}
          </Text>
        </YStack>
        <YStack alignItems="center" gap="$2">
          <CustomIcon name="client" size="$6" />
          <Text
            fontWeight="600"
            $sm={{
              fontSize: '$2',
            }}
          >
            {t('web-home:client')}
          </Text>
        </YStack>
      </XStack>
    </>
  );
  const renderOptionText = () => (
    <YStack
      alignItems="center"
      w={'100%'}
      justifyContent="center"
      backgroundColor={'$color1'}
      borderRadius="$4"
      paddingVertical="$8"
      marginBottom="$3"
      $sm={{
        paddingVertical: '$2',
      }}
    >
      {renderIcons()}
      <XStack
        alignItems="center"
        gap="$2"
        paddingTop="$12"
        $md={{ gap: '$4' }}
        $xs={{ gap: '$2' }}
      >
        <Pressable onPress={() => router.push('/client')}>
          <CustomIcon name="large_arrow_right" size="$1" color="$gray10" />
        </Pressable>
        <Text
          fontWeight="800"
          fontSize={30}
          textAlign="center"
          $xs={{
            fontSize: 15,
          }}
        >
          {t('web-home:banner-3')}
        </Text>
      </XStack>
      <Text
        fontWeight="400"
        fontSize={25}
        textAlign="center"
        suppressHighlighting={true}
        width="80%"
        paddingTop="$6"
        lineHeight={50}
        $sm={{
          fontSize: 15,
          lineHeight: 25,
          paddingTop: '$3',
          textAlign: 'center',
        }}
      >
        {t('web-home:content-3')}
      </Text>
    </YStack>
  );

  return (
    <YStack>
      {renderWelcomeText()}
      {renderImageBackground()}
      {renderOptionText()}
    </YStack>
  );
}
