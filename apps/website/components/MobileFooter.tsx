import { XStack, YStack, Text } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { t } from 'i18next';
import React from 'react';
import { TouchableOpacity } from 'react-native';

export function MobileFooter() {
  return (
    <YStack w={'98%'} $gtSm={{ display: 'none' }}>
      <YStack backgroundColor={'$color'} padding="$4" borderRadius="$4">
        <XStack justifyContent="flex-end">
          <CustomIcon name={'weblogo'} width="$6" height="$2.5" />
        </XStack>
        <XStack justifyContent="space-between" paddingVertical="$4">

          <YStack gap="$3">
            <Text
              color={'$color5'}
              fontWeight={'500'}
              fontSize={9}
            >
              {t('web-home:aboutfooter')}
            </Text>
            <TouchableOpacity>
              <Text color={'$color1'}
                fontSize={8}
              >{t('web-home:investor')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:delivering')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:commercial')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:certificates')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:aboutsawaed')}</Text>
            </TouchableOpacity>
          </YStack>
          <YStack gap="$3">
            <Text color={'$color5'}
              fontWeight={'500'}
              fontSize={8}>
              {t('web-home:legal')}
            </Text>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:term')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:customer')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:privacy')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:cookie')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:sdk')}</Text>
            </TouchableOpacity>
          </YStack>
          <YStack gap="$4">
            <Text color={'$color5'} fontWeight={'500'} fontSize={9}>
              {t('web-home:contact')}
            </Text>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:jobs')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:aramex')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:blogstix')}</Text>
            </TouchableOpacity>
            <TouchableOpacity>
              <Text color={'$color1'} fontSize={8}>{t('web-home:support')}</Text>
            </TouchableOpacity>
          </YStack>
        </XStack>
        <XStack gap="$4" alignItems='flex-start' paddingHorizontal='$4'>
          <YStack gap='$2'>
            <Text color={'$color1'} fontWeight={'bold'}
            fontSize={'$1'}
            >
              {t('web-home:followus')}
            </Text>
            <XStack gap="$3">
              <TouchableOpacity>
                <CustomIcon name="facebook" color={'$color1'} />
              </TouchableOpacity>
              <TouchableOpacity>
                <CustomIcon name="instagram" color={'$color1'} />
              </TouchableOpacity>
              <TouchableOpacity>
                <CustomIcon name="snapchat" color={'$color1'} />
              </TouchableOpacity>
              <TouchableOpacity>
                <CustomIcon name="tiktok" color={'$color1'} />
              </TouchableOpacity>
            </XStack>
          </YStack>
          <YStack gap='$3'>
            <Text color={'$color1'} fontSize={'$1'}>{t('web-home:download')}</Text>
            <XStack gap="$2">
              <TouchableOpacity>
                <CustomIcon
                  name="appstore"
                  color={'$color1'}
                  width={60}
                  height={36}
                />
              </TouchableOpacity>
              <TouchableOpacity>
                <CustomIcon
                  name="googleplay"
                  color={'$color1'}
                  width={60}
                  height={36}
                />
              </TouchableOpacity>
            </XStack>
          </YStack>
        </XStack>
      </YStack>
      <YStack justifyContent="space-between" padding="$4" alignItems='center'>
        <Text color={'$color0'} textAlign='center'>
          All rights reserved {<Text color={'$color5'}>Sawaed Logistics </Text>}
          © 2024
        </Text>
        <Text color={'$color0'}>Terms and Conditions | Privacy Policy</Text>
      </YStack>
    </YStack>
  );
}
