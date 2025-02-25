import AsyncStorage from '@react-native-async-storage/async-storage';
import { t } from 'i18next';
import React, { useEffect, useState } from 'react';
import { Image, Stack, YStack, Text, Button } from 'tamagui';
/* eslint-disable-next-line */
export interface ZixCookiesBannerProps {
}


export function ZixCookiesBanner(props: ZixCookiesBannerProps) {

  const onCookie = async () => {
    // save a boolean to async storage
    await AsyncStorage.setItem('cookies', 'true');
    setIsCookie(true);
  }
  const [isCookie, setIsCookie] = useState(false);

  useEffect(() => {
    const checkCookie = async () => {
      const cookie = await AsyncStorage.getItem('cookies');
      console.log('cookie', cookie);
      if (cookie) {
        setIsCookie(true);
      }
    }
    checkCookie();
  }, [])

  const renderButton = () => (
    <Stack
      gap="$4"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      flex={1}
      $sm={{
        flexDirection: "column",
      }}
    >
      <Button
        borderColor='$color11'
        variant='outlined'
        flex={1}
        $sm={{
          width: '100%',
        }}
        onPress={() => onCookie()}
      >
        {t('cookies-banner:section-1:banner-1')}
      </Button>
      <Button
        borderColor='$color11'
        variant='outlined'
        flex={1}
        $sm={{
          width: '100%',
        }}
        onPress={() => onCookie()}
      >
        {t('cookies-banner:section-1:banner-2')}
      </Button>
      <Button
        flex={1}
        $sm={{
          width: '100%',
        }}
        onPress={() => onCookie()}
      >
        {t('cookies-banner:section-1:banner-3')}
      </Button>
    </Stack>
  );
  const renderText = () => (
    <YStack
      width={590}
      gap="$2"
      $sm={{
        width: 240,
        gap: '$1',
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text
        fontSize={20}
        fontWeight="900"
        lineHeight={40}
      > {t('cookies-banner:section-1:title-1')}</Text>
      <Text
        fontSize={10}
        lineHeight={20}
        $sm={{
          fontSize: 10,
          lineHeight: 20,
          textAlign: "center",
        }}
      >{t('cookies-banner:section-1:description')}</Text>
    </YStack>
  );

  return !isCookie && (
    <Stack
      theme={'accent'}
      gap="$9"
      marginTop="$7"
      flexDirection="row"
      justifyContent="center"
      alignItems="center"
      flexWrap="wrap"
      backgroundColor={'$color2'}
      borderRadius={10}
      paddingVertical="$5"
      paddingHorizontal="$6"
      $sm={{
        flexDirection: "row",
        gap: "$4",
      }}
    >
      <Image
        alt="Banner"
        source={{
          uri: `/images/Group-1.png`,
        }}
        width={79}
        height={79}
        resizeMode="cover"
        position="responsive"
        $sm={{
          height: 100,
          width: 100,
        }}
      />
      {renderText()}
      {renderButton()}
    </Stack>
  );
}


export default ZixCookiesBanner;
