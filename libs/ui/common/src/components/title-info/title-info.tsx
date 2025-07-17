import { Image, YStack, Text, XStack, Theme } from 'tamagui';

export interface TitleInfoProps {
  icon: React.ReactNode;
  title: string;
  props?: any;
}

export const TitleInfo: React.FC<TitleInfoProps> = ({ icon, title, ...props }) => {
  return (
    <XStack alignItems="center" gap="$2">
      {icon}
      <Text  color="$color0" fontWeight="600" fontSize="$1" numberOfLines={1} {...props}>
        {title}
      </Text>
    </XStack>
  );
};

export default TitleInfo;
