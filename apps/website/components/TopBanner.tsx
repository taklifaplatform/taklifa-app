import React from 'react';
import { YStack, Text, Image, XStack, Button, Stack } from 'tamagui';
import { t } from 'i18next';
import { useMultiLang } from '@zix/i18n';
import { useRouter } from 'next/router';
import { ButtonItem } from './ButtonItem';

/**
 * /customer
 * /solo-driver
 * /company
 * @returns
 */
export function TopBanner() {
  const { activeLang } = useMultiLang();
  const router = useRouter();

  const renderImageBackground = () => (
    <>
      <Stack $lg={{ display: 'none' }}>
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-1-${activeLang}.png`,
          }}
          width="100%"
          height={'632px'}
          borderRadius={'$4'}
          resizeMode="contain"
        />
      </Stack>
      {/* version tablette */}
      <Stack $gtLg={{ display: 'none' }}>
        <Image
          alt="Banner"
          source={{
            uri: `/images/banner-1-${activeLang}.png`,
          }}
          width="100%"
          height={'360px'}
          borderRadius={'$4'}
          resizeMode="cover"
        />
      </Stack>
    </>
  );

  const renderText = () => (
    <>
      <Stack
        flexDirection="column"
        flexWrap="wrap"
        paddingHorizontal="$5"
        $lg={{ display: 'none' }}
      >
        <Text
          fontWeight="800"
          fontSize="50px"
          paddingVertical="$4"
          textAlign="center"
        >
          {t('web-home:banner-1')}
        </Text>
        <Text fontWeight="700" fontSize="14px" textAlign="center">
          {t('web-home:content-1')}
        </Text>
      </Stack>
      <Stack
        flexDirection="column"
        flexWrap="wrap"
        paddingHorizontal="$5"
        $gtLg={{ display: 'none' }}
      >
        <Text
          fontWeight="800"
          fontSize="18px"
          paddingVertical="$4"
          textAlign="center"
        >
          {t('web-home:banner-1')}
        </Text>
        <Text fontWeight="700" fontSize="12px" textAlign="center">
          {t('web-home:content-1')}
        </Text>
      </Stack>
    </>
  );

  const renderButton = () => (
    <Stack 
      flexDirection="row" 
      flexWrap="wrap" 
      justifyContent="center"
    gap="$6" paddingTop="$5" $sm={{ gap: '$3'}}>
      <ButtonItem
        name={t('web-home:company')}
        path="/auth/login"
        backgroundColor={'$color'}
        color={'$color1'}
        borderRadius="$4"
        width="164px"
        height="55px"
        $sm={{
          width:"122px",
        height:"55px"
        }}
      />
      <ButtonItem
        name={t('web-home:singlecarrier')}
        path="/auth/login"
        borderColor={'$color'}
        borderWidth={2}
        borderRadius="$4"
        width="164px"
        height="55px"
        $sm={{
          width:"122px",
        height:"55px"
        }}
      />

    </Stack>
  );

  const renderContainer = () => (
    <Stack
      flex={1}
      flexDirection="column"
      flexWrap="wrap"
      width={'100%'}
      position="absolute"
      justifyContent="center"
      alignItems="center"
      paddingVertical="$6"
      $lg={{
        paddingVertical: '$2',
      }}
    >
      {renderText()}
      {renderButton()}
    </Stack>
  );
  return (
    <Stack
    marginBottom="$3"
    >
      {renderImageBackground()}
      {renderContainer()}
    </Stack>
  );
}
