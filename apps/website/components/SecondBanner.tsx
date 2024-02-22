import React from 'react';
import { YStack, Text, XStack, Button, Stack } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { t } from 'i18next';
import { Image } from 'react-native';

export function SecondBanner() {
  return (
    <YStack
    $sm={{
      w: '100%'
    }}
    >
     <Stack
     $sm={{
      display: 'none',
     }}
     >
     <Image
        alt="Banner"
        source={{
          uri: '/images/banner-2.png',
          width: '100%',
          height: 614

        }}
        resizeMode="contain"

      />
     </Stack>
      <Stack
      $gtSm={{
        display: 'none'
      }}
      >
      <Image
        alt="Banner"
        source={{
          uri: '/images/banner-2-mobile.png',
        }}
        style={{
          width: '100%',
          height: 450
        }}
       
        resizeMode="contain"

      />
      </Stack>
      <YStack
        position="absolute"
        alignItems="center"
        w={'100%'}
        justifyContent="center"
        paddingVertical="$10"
        $sm={{
          paddingVertical: "$3"
        }}
      >
        <XStack alignItems="center" gap="$2">
          <CustomIcon name="large_arrow_left" size="$2" color="$gray10" />
          <Text fontWeight="bold" fontSize="$9"
            $sm={{
              fontSize: "$4"
            }}
          >
            {t('web-home:banner-2')}
          </Text>
        </XStack>
        <Text
          fontWeight="400"
          fontSize="$4"
          textAlign="center"
          width="80%"
          paddingTop="$6"
          $sm={{
            fontSize: "$2",
            paddingTop: "$3",
            textAlign: 'center',
            width: '100%'
          }}
        >
          {t('web-home:content-2')}</Text>
      </YStack>
      <XStack
        bottom={'16%'}
        position="absolute"
        zIndex={100}
        w={'100%'}
        alignItems="center"
        justifyContent="center"
        gap="$13"
        $sm={{
          gap: "$4",
          bottom: '22%'
        }}
      >
        <YStack alignItems="center" gap="$2">
          <CustomIcon name="client" size="$6" />
          <Text fontWeight="600"
            $sm={{
              fontSize: "$2"
            }}
          >{t('web-home:client')}</Text>
        </YStack>
        <YStack alignItems="center" gap="$2">
          <CustomIcon name="shipping" size="$6" />
          <Text fontWeight="600"
            $sm={{
              fontSize: "$2"
            }}
          >{t('web-home:driver')}</Text>
        </YStack>
        <YStack alignItems="center" gap="$2">
          <CustomIcon name="companyshipping" size="$6" />
          <Text fontWeight="600"
            $sm={{
              fontSize: "$2"
            }}
          >{t('web-home:company')}</Text>
        </YStack>
      </XStack>
      <YStack
        position="absolute"
        alignItems="center"
        w={'100%'}
        justifyContent="center"
        paddingVertical="$10"
        bottom={'-27%'}
        backgroundColor={'$color1'}
        borderRadius='$4'
        $sm={{
          bottom: '-10%',
          paddingVertical: "$2"
        }}
      >
        <XStack alignItems="center" gap="$2" paddingTop='$12'
        $sm={{
          paddingTop: "$12",
        }}
        >
          <CustomIcon name="large_arrow_left" size="$2" color="$gray10" />
          <Text fontWeight="bold" fontSize="$9"
            $sm={{
              fontSize: "$4"
            }}
          >
            {t('web-home:banner-3')}
          </Text>
        </XStack>
        <Text
          fontWeight="400"
          fontSize="$4"
          textAlign="center"
          width="80%"
          paddingTop="$6"
          $sm={{
            fontSize: "$2",
            paddingTop: "$1",
          }}
        >
          {t('web-home:content-3')}
        </Text>
      </YStack>
    </YStack>
  );
}
