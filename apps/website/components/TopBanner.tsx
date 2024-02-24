import React from 'react';
import { YStack, Text, Image, XStack, Button } from 'tamagui';
import { t } from 'i18next';
import { useMultiLang } from '@zix/i18n';

export function TopBanner() {
  const { activeLang } = useMultiLang();
  return (
    <YStack
    alignItems='center'
    $sm={{
      //w: 800
    }}
    >
      <Image
        alt="Banner"
        source={{
          uri: `/images/banner-1-${activeLang}.png`
        }}
        width='100%'
        height={632}
        $sm={{
          width: '100%',
          height: 476,
          borderRadius:10

        }}
        resizeMode="cover"
      />
      <YStack
        position="absolute"
        alignItems="center"
        w={'100%'}
        $sm={{
          width: '100%',
          alignItems: 'center',
          paddingVertical: "$4",
          paddingHorizontal: "$5"
        }}
        justifyContent="center"
        paddingVertical="$10"
      >
        <Text fontWeight="bold" fontSize="$9" paddingVertical="$4" textAlign='center'
        $sm={{
          fontSize: "$5"
        }}
        >
          {t('web-home:banner-1')}
        </Text>
        <Text fontWeight="600" fontSize="$4" textAlign='center'
        $sm={{
          fontSize: "$2"
        }}
        >
          {t('web-home:content-1')}
        </Text>

        <XStack gap="$4" paddingTop="$5">
          <Button
            backgroundColor={'$color'}
            borderRadius={10}
            size="$6"
            $sm={{
              w: 150,
              size: "$4"
            }}
          //  w={164}
          >
            <Text color="$color1" fontWeight="600" fontSize="$4">
              {t('web-home:company')}
            </Text>
          </Button>
          <Button
            backgroundColor={'transparent'}
            borderRadius={10}
            borderColor={'$color'}
            borderWidth={2}
            size="$6"
            $sm={{
             w:150,
              size: "$4"
            }}
           // w={164}
          >
            <Text color="$black" fontWeight="600" fontSize="$4">
              {t('web-home:singlecarrier')}
            </Text>
          </Button>
        </XStack>
      </YStack>
    </YStack>
  );
}
