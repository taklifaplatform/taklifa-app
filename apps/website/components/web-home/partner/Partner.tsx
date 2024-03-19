import { t } from 'i18next';
import { Image, Stack, Text, XStack, YStack } from 'tamagui';

export function Partner() {
  const renderPartnerLogos = () => (
    <Stack
      flexDirection="row"
      flexWrap="wrap"
      gap='$4'
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
    </Stack>
  );


  const renderOptionText = () => (
    <YStack
      alignItems="start"
      justifyContent="center"
      borderRadius="$4"
      marginBottom="$3"
    >
      <Text
        fontWeight="800"
        fontSize={30}
        textAlign="center"
        $md={{
          fontSize: 15,
        }}
      >
        {t('web-home:banner-6')}
      </Text>
      <Text
        fontWeight="400"
        fontSize={25}
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
      w={'100%'}
      backgroundColor={'$color1'}
      borderRadius="$3"
      paddingHorizontal="$6"
      paddingVertical="$8"
      marginBottom="$3"
      $sm={{
        paddint: '$4',
      }}
    >
      {renderOptionText()}
      {renderPartnerLogos()}
    </YStack>
  );
}
