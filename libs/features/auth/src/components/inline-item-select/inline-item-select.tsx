import { CustomIcon, CustomIconName } from '@zix/ui/icons';
import { Avatar, Button, Text, Theme, XStack } from 'tamagui';
import React from 'react';

export interface InlineItemSelectProps {
  onSelect: (value: string) => void;
  selectedValue?: string;
  value: string;
  icon: CustomIconName;
  title: string;
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
}) => {
  return (
    <XStack
      onPress={() => onSelect(value)}
      hoverStyle={{ backgroundColor: '$color5' }}
      paddingVertical="$2"
      paddingHorizontal="$4"
      justifyContent="space-between"
      alignItems="center"
      borderColor={selectedValue === value ? '$color5' : '$color2'}
      borderWidth="$0.5"
      borderRadius="$6"
      backgroundColor="$color2"
      cursor="pointer"
    >
      <Theme name="light">
        <Avatar size="$6">
          <CustomIcon name={icon} size="$4" color="$color5" />
        </Avatar>
      </Theme>

      <Text fontSize="$4" fontWeight="800">
        {title}
      </Text>
      <Button
        pressStyle={{
          backgroundColor: 'transparent',
          borderWidth: 0,
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
