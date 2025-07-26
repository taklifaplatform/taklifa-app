import React from 'react';
import { Sheet, Text, ThemeableStackProps, View, YStack } from 'tamagui';

export interface ZixAlertAction extends ThemeableStackProps {
  label: string;
  onPress: () => void;
}

export interface ZixAlertActionsProps {
  children?: React.ReactNode;
  title?: string;
  description?: string;
  icon?: React.ReactNode;
  closeButton: boolean;
}

export const ZixAlertActions: React.FC<ZixAlertActionsProps> = ({
  children,
  title,
  description,
  icon,
  closeButton,
}) => {
  return (
    <View>
      {children}
      {closeButton && (
        <Sheet modal open snapPoints={[50, 100]} position={1}>
          <Sheet.Overlay
            animation="lazy"
            backgroundColor="black"
            opacity={0.6}
          />
          <Sheet.Frame
            justifyContent="flex-end"
            alignItems="center"
            backgroundColor="transparent"
          >
            <YStack
              theme="accent"
              width={'90%'}
              alignItems="center"
              justifyContent="center"
              padding={'$6'}
              backgroundColor={'white'}
              borderRadius={'$4'}
              gap={'$4'}
            >
              {icon && icon}
              <Text fontSize={'$4'} fontWeight="bold" textAlign="center" color="$color11">
                {title}
              </Text>
              <Text fontSize={14} textAlign="center" color="$color11">
                {description}
              </Text>
            </YStack>
          </Sheet.Frame>
        </Sheet>
      )}
    </View>
  );
};

export default ZixAlertActions;
