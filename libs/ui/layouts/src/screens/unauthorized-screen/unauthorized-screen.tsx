
import { SubmitButton } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import React from 'react';
import { useRouter } from 'solito/router';

import { Button, YStack, H2, Avatar, Theme, View, XStack, H3, Paragraph } from 'tamagui';

/* eslint-disable-next-line */
export interface UnauthorizedScreenProps {
}


export function UnauthorizedScreen(props: UnauthorizedScreenProps) {
  const router = useRouter();

  return (
    <YStack padding='$4' flex={1} justifyContent={'space-between'}>
      <XStack marginBottom={'$4'} justifyContent={'space-between'}>
        <Button
          pressStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
          icon={<CustomIcon name="arrow_left" size="$2" color="$color11" />}
          backgroundColor="$color2"
          width="$5"
          onPress={() => router.back()}
        />
        <View width="$5" />
      </XStack>
      <YStack
        gap="$3"
        marginBottom="$4"
        justifyContent={'center'}
        alignItems={'center'}
      >
        <Avatar size="$10" margin="$2">
          <Theme name="accent">
            <CustomIcon name='logo' size="$10" color="$color1" />
          </Theme>
        </Avatar>
        <H3>{t('common:app_name')}</H3>
        <Paragraph theme="alt1" textAlign="center">
          {t('common:login-to-access-app')}
        </Paragraph>
      </YStack>
      <SubmitButton themeInverse onPress={() => router.push('/auth/login')}>
        {t('auth:sign_in')}
      </SubmitButton>
    </YStack>
  );
}


export default UnauthorizedScreen;
