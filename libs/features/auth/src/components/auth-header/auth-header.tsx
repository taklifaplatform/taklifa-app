import { InlineStepper } from '@zix/ui/common';
import {
  Avatar,
  Button,
  H3,
  Paragraph,
  Theme,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';
import { useRouter } from 'solito/router';

export type AuthHeaderProps = {
  showIcon?: boolean;
  onGoBack?: () => void;
  canGoBack?: boolean;
  onGoNext?: () => void;
  canGoNext?: boolean;
  iconColor?: string;
  iconName?: 'logo' | 'avatar';

  title?: string;
  description?: string;

  activeStep?: number;
  totalSteps?: number;
};

export const AuthHeader: React.FC<AuthHeaderProps> = (props) => {
  const router = useRouter();

  const {
    onGoBack = () => router.back(),
    canGoBack = true,
    onGoNext = () => null,
    canGoNext,
    iconColor = '$color1',
    iconName = 'logo',
    showIcon = true,
  } = props;

  return (
    <View>
      <XStack marginBottom={'$4'} justifyContent={'space-between'}>
        {canGoBack ? (
          <Button
            pressStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            icon={<CustomIcon name="arrow_left" size="$2" color="$color11" />}
            backgroundColor="transparent"
            width="$5"
            onPress={() => onGoBack()}
          />
        ) : (
          <View width="$5" />
        )}

        

        {canGoNext ? (
          <Button
            disabled={!canGoNext}
            pressStyle={{ backgroundColor: 'transparent', borderWidth: 0 }}
            icon={<CustomIcon name="arrow_right" size="$2" color="$color11" />}
            backgroundColor="transparent"
            onPress={() => onGoNext()}
            width="$5"
          />
        ) : (
          <View width="$5" />
        )}
      </XStack>

      <YStack justifyContent="center" alignItems="center">
        {props.totalSteps && (
          <InlineStepper
            activeStep={props.activeStep || 0}
            totalSteps={props.totalSteps}
          />
        )}
        <YStack
          gap="$3"
          marginBottom="$4"
          justifyContent={'center'}
          alignItems={'center'}
        >
          {props.title && <H3>{props.title}</H3>}
          {props.description && (
            <Paragraph theme="alt1" textAlign="center">
              {props.description}
            </Paragraph>
          )}
          {showIcon && (
          <Avatar size="$10" margin="$2">
            <Theme name="accent">
              <CustomIcon name={iconName} size="$10" color={iconColor} />
            </Theme>
          </Avatar>
        )}
        </YStack>
      </YStack>
    </View>
  );
};
