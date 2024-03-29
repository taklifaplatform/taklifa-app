import { t } from 'i18next';
import React from 'react';
import { Image, Stack, YStack, Text, Button } from 'tamagui';
/* eslint-disable-next-line */
export interface ZixCookiesBannerProps {
}


export function ZixCookiesBanner(props: ZixCookiesBannerProps) {
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
      >
        {t('cookies-banner:section-1:banner-2')}
      </Button>
      <Button
        flex={1}
        $sm={{
          width: '100%',
        }}
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

  return (
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
