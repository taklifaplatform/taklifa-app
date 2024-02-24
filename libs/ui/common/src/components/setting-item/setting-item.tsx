import { IconProps } from '@tamagui/helpers-icon';
import { CustomIcon } from '@zix/ui/icons';
import {
  ListItem,
  ListItemProps,
  SizableText,
  XStack,
  YGroup,
  YStack,
} from 'tamagui';

export type SettingItemProps = {
  icon: React.FC<IconProps>;
  rightLabel?: string;
  /**
   * native only - not showing colors on native
   */
  accentColor?: ListItemProps['backgroundColor'];
  /**
   * web only - to indicate the current page
   */
  isActive?: boolean;
} & ListItemProps;

export const SettingItem = ({
  icon: Icon,
  children,
  rightLabel,
  isActive,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  accentColor: _, // not used on web - destructuring to avoid passing it through props
  ...props
}: SettingItemProps) => {
  return (
    <YGroup.Item>
      <ListItem
        hoverTheme
        cursor="pointer"
        gap="$2"
        borderRadius="$10"
        backgroundColor={isActive ? '$backgroundFocus' : '$color1'}
        {...props}
      >
        <YStack
          padding="$2"
          borderRadius="$3"
          backgroundColor={'rgba(255, 251, 237, 1)'}
        >
          <Icon opacity={0.6} size={22} />
        </YStack>
        <SizableText flex={1} fontWeight={'500'} textAlign="left">
          {children}
        </SizableText>
        {!!rightLabel && (
          <XStack
            borderRadius="$10"
            backgroundColor="$backgroundPress"
            paddingHorizontal="$3"
            paddingVertical="$1.5"
          >
            <SizableText size="$1" textTransform="capitalize">
              {rightLabel}
            </SizableText>
          </XStack>
        )}
        <CustomIcon name="chevron_right" size="$1" color="$color11" />
      </ListItem>
    </YGroup.Item>
  );
};

export default SettingItem;
