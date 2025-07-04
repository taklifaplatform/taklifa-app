import { Image, YStack, Text, XStack, Theme } from 'tamagui';

export interface TitleInfoProps {
  icon: React.ReactNode;
  title: string;
  props?: any;
}

export const TitleInfo: React.FC<TitleInfoProps> = ({ icon, title, ...props }) => {
  return (
    <XStack alignItems="center" gap="$2">
      <Theme name="accent">{icon}</Theme>
      <Text color="$color12" fontWeight="600" fontSize="$1" numberOfLines={1} {...props}>
        {title}
      </Text>
    </XStack>
  );
};

export default TitleInfo;
