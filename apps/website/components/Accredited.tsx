import React from 'react';
import { XStack, YStack, Text, Image } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';

export function Accredited() {
  return (
    <YStack
      alignItems="center"
      //  w={'100%'}
      justifyContent="center"
      paddingVertical="$10"
      backgroundColor={'$color1'}
      borderRadius="$4"
      $sm={{
        paddingVertical: '$3',
        bottom: '-6.2%',
        width: '95%',
      }}
    >
      <XStack
        alignItems="center"
        gap="$4"
        paddingTop="$12"
        $sm={{
          paddingTop: '$0',
          gap: '$2',
        }}
      >
        <CustomIcon name="large_arrow_left" size="$2" color="$gray10" />
        <Text
          fontWeight="bold"
          fontSize="$9"
          $sm={{
            fontSize: '$4',
          }}
        >
          {t('web-home:banner-6')}
        </Text>
      </XStack>
      <Text
        fontWeight="400"
        fontSize="$4"
        textAlign="center"
        width="80%"
        paddingTop="$6"
        $sm={{
          fontSize: '$2',
          paddingTop: '$3',
          textAlign: 'center',
          width: '90%',
        }}
      >
        {t('web-home:content-6')}
      </Text>
      <XStack
        alignItems="center"
        justifyContent="space-around"
        w={'100%'}
        paddingTop="$10"
        $sm={{
          paddingTop: '$4',
        }}
      >
        <Image
          source={{
            uri: '/images/TNT_Express_Logo.png',
          }}
          w={108}
          height={39}
          $sm={{
            width: 31,
            height: 11,
          }}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: '/images/FedEx_Express.png',
          }}
          w={86}
          height={40}
          $sm={{
            width: 25,
            height: 11,
          }}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: '/images/Aramex_logo.png',
          }}
          w={243}
          height={40}
          $sm={{
            width: 70,
            height: 11,
          }}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: '/images/Amazon_logo.png',
          }}
          w={131}
          height={39}
          $sm={{
            width: 38,
            height: 11,
          }}
          resizeMode="contain"
        />
        <Image
          source={{
            uri: '/images/DHL_Logo.png',
          }}
          w={280}
          height={40}
          $sm={{
            width: 81,
            height: 11,
          }}
          resizeMode="contain"
        />
      </XStack>
    </YStack>
  );
}
