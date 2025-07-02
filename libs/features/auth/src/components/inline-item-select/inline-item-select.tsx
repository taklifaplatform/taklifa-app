import { CustomIcon, CustomIconName } from '@zix/ui/icons';
import { Avatar, Button, Text, Theme, XStack, YStack } from 'tamagui';
import React from 'react';
import { t } from 'i18next';

export interface InlineItemSelectProps {
  onSelect: (value: string) => void;
  selectedValue?: string;
  value: string;
  showServiceProvider?: boolean;
  icon: CustomIconName;
  title: string;
  smallTitle?: boolean;
}

/**
 * Renders an inline item select component.
 *
 * @component
 * @param {Object} props - The component props.
 * @param {Function} props.onSelect - The function to be called when the item is selected.
 * @param {any} props.selectedValue - The currently selected value.
 * @param {any} props.value - The value of the item.
 * @param {string} props.icon - The name of the icon to be displayed.
 * @param {string} props.title - The title of the item.
 * @returns {JSX.Element} The rendered component.
 */
export const InlineItemSelect: React.FC<InlineItemSelectProps> = ({
  onSelect,
  selectedValue,
  value,
  icon,
  title,
  showServiceProvider,
  smallTitle,
}) => {
  return (
    <XStack
      onPress={() => onSelect(value)}
      hoverStyle={{ backgroundColor: '$color5' }}
      paddingHorizontal="$2"
      justifyContent="space-between"
      alignItems="center"
      borderColor={selectedValue === value ? '$color5' : '$color2'}
      borderWidth="$1"
      borderRadius="$6"
      backgroundColor="$color2"
      cursor="pointer"
    >
      <XStack alignItems="center" gap="$2">
        <Theme name="accent">
          <Avatar size="$8">
            <CustomIcon name={icon} size="$8" color="$color1" />
          </Avatar>
        </Theme>

        <YStack gap="$1" alignItems="flex-start" flex={0.8}>
          {showServiceProvider && (
            <Text fontSize="$4" fontWeight="800">
              {t('common:account_types.seek.service_provider')}
            </Text>
          )}
          <Text fontSize={smallTitle ? '$3' : '$4'} fontWeight="800" textAlign="left">
            {title}
          </Text>
        </YStack>
      </XStack>
      <Button
        pressStyle={{
          backgroundColor: 'transparent',
          borderWidth: "$0",
          padding: 0,
        }}
        icon={(props) => (
          <CustomIcon name="chevron_right" {...props} size="$2" />
        )}
        backgroundColor="transparent"
        padding={'$0'}
        color="$color11"
      />
    </XStack>
  );
};

export default InlineItemSelect;
