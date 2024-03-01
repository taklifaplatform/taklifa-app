import React from 'react';
import { XStack, YStack, Text, Image } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { Pressable } from 'react-native';

export function Partner() {
  const renderPartnerLogos = () => (
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
  );
  const renderOptionText = () => (
    <YStack
      alignItems="center"
      width={'90%'}
      justifyContent="center"
      borderRadius="$4"
      marginBottom="$3"
    >
      <XStack
        alignItems="center"
        gap="$2"
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
          {t('web-home:banner-6')}
        </Text>
      </XStack>
      <Text
        fontWeight="400"
        fontSize={25}
        textAlign="center"
        paddingTop="$6"
        lineHeight={50}
        $sm={{
          fontSize: 15,
          lineHeight: 25,
          paddingTop: '$3',
          textAlign: 'center',
        }}
      >
        {t('web-home:content-6')}
      </Text>
    </YStack>
  );
  return (
    <YStack
      alignItems="center"
      w={'100%'}
      justifyContent="center"
      backgroundColor={'$color1'}
      borderRadius="$3"
      paddingHorizontal="$4"
      paddingVertical="$12"
      marginBottom="$3"
      $sm={{
        paddingHorizontal: '$4',
        paddingVertical: '$4',
      }}
    >
      {renderOptionText()}
      {renderPartnerLogos()}
    </YStack>
  );
}
