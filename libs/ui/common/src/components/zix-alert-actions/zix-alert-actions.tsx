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
        <Sheet modal open snapPoints={[100, 100]} position={100}>
          <Sheet.Overlay
            animation="lazy"
            enterStyle={{ opacity: 0 }}
            exitStyle={{ opacity: 0 }}
          />
          <Sheet.Frame
            justifyContent="flex-end"
            backgroundColor="gray"
            opacity={0.9}
            overflow="hidden"
            alignItems="center"
            marginBottom={40}
          >
            <YStack
              marginHorizontal={'$4'}
              alignItems="center"
              justifyContent="center"
              padding={'$6'}
              zIndex={1000}
              backgroundColor={'white'}
              borderRadius={'$4'}
              gap={'$4'}
              opacity={1}
              position="absolute"
              bottom={400}
              left={0}
              right={0}
            >
              {icon && icon}
              <Text fontSize={'$4'} fontWeight="bold" textAlign="center">
                {title}
              </Text>
              <Text fontSize={14} textAlign="center">
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
