import {
  H2,
  Separator,
  XStack,
  YGroup,
  YStack,
  styled,
  withStaticProperties,
} from 'tamagui';
import SettingItem from '../setting-item/setting-item';

const SettingsWrapper = styled(YStack, {
  borderColor: '$color4',
  gap: '$5',
  flex: 1,
});

const SettingsItems = styled(YStack, {
  '$platform-web': {
    // https://github.com/tamagui/tamagui/issues/1803
    // separator: <Separator borderColor="$color3" mx="$-4" borderWidth="$0.25" />,
    gap: '$4',
    margin: '$4',
  },
  gap: '$4',
  margin: '$4',
});

const SettingsGroup = styled(YGroup, {
  '$platform-native': {
    separator: (
      <XStack>
        <YStack width={20} backgroundColor="$color2" />
        <Separator borderColor="#E0E0E0" borderWidth="$0.25" />
      </XStack>
    ),
  },
  backgroundColor: 'transparent',
});

const SettingsTitle = styled(H2, {
  '$platform-web': {
    marginHorizontal: '$6',
  },
  marginHorizontal: '$4',
  paddingVertical: '$4',
});

export const Settings = withStaticProperties(SettingsWrapper, {
  Item: SettingItem,
  Items: SettingsItems,
  Group: SettingsGroup,
  Title: SettingsTitle,
});

export default Settings;
