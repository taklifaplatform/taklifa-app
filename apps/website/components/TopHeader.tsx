import { XStack, Text, Image, AlertDialog, Button, YStack } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { useMultiLang } from '@zix/i18n';
import { t } from 'i18next';
import React from 'react';
import { Alert, TouchableOpacity } from 'react-native';

export function TopHeader() {
  const { changeLanguage } = useMultiLang();

  return (
    <XStack
      $sm={{ display: 'none' }}
      alignItems="center"
      justifyContent="space-around"
      paddingVertical="$5"
      backgroundColor="$gray3"
      borderTopLeftRadius={20}
      borderTopRightRadius={20}
    >
      {/*<TouchableOpacity
        onPress={() => {
          changeLanguage('ar');
        }}
      >
        Change Lang
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          changeLanguage('en');
        }}
      >
        Change Lang en
      </TouchableOpacity>*/}
      <XStack gap="$2" alignItems="center">
        <Text fontWeight={'500'} fontSize="$2">
          {t('web-home:followus')}
        </Text>
        <XStack gap="$2">
          <CustomIcon name={'facebook'} />
          <CustomIcon name={'instagram'} />
          <CustomIcon name={'snapchat'} />
        </XStack>
      </XStack>
      <XStack gap="$2" alignItems="center">
        <Text fontWeight={'500'} fontSize="$2">
          {t('web-home:download')}
        </Text>
        <XStack gap="$2">
          <CustomIcon name={'appstore'} />
          <CustomIcon name={'googleplay'} />
        </XStack>
      </XStack>
      <XStack gap="$2" alignItems="center">
        <Text fontWeight={'500'} fontSize="$2">
          saudi arabia
        </Text>
        <XStack gap="$2">
          <Image
            source={{
              uri: '/images/flag.png',
              width: 20,
              height: 20,
            }}
            resizeMode="contain"
          />
          <CustomIcon name={'location'} />
        </XStack>
      </XStack>
      <AlertDialog native>
        <AlertDialog.Trigger asChild>
          <Button unstyled>{t('web-home:translate')}</Button>
        </AlertDialog.Trigger>

        <AlertDialog.Portal>
          <AlertDialog.Overlay
            key="overlay"
            animation="quick"
            opacity={0.5}
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <AlertDialog.Content
            bordered
            elevate
            key="content"
            animation={[
              'quick',
              {
                opacity: {
                  overshootClamping: true,
                },
              },
            ]}
            enterStyle={{ x: 0, y: -20, opacity: 0, scale: 0.9 }}
            exitStyle={{ x: 0, y: 10, opacity: 0, scale: 0.95 }}
            x={0}
            scale={1}
            opacity={1}
            y={0}
          >
            <YStack gap>
              <AlertDialog.Description>Select Language</AlertDialog.Description>

              <XStack gap="$3" justifyContent="flex-end">
                <AlertDialog.Cancel asChild>
                  <Button onPress={() => changeLanguage('en')}>English</Button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <Button onPress={() => changeLanguage('ar')}>Arabic</Button>
                </AlertDialog.Action>
              </XStack>
            </YStack>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog>
      <XStack gap="$2" alignItems="center">
        <Text fontWeight={'500'} fontSize="$2">
          {t('web-home:question')}
        </Text>
        <XStack gap="$2">
          <CustomIcon name={'help'} />
        </XStack>
      </XStack>
      <XStack gap="$2" alignItems="center">
        <Text fontWeight={'500'} fontSize="$2">
          {t('web-home:home')}
        </Text>
        <XStack gap="$2">
          <CustomIcon name={'homeinfo'} />
        </XStack>
      </XStack>
    </XStack>
  );
}
