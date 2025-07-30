import { Text, XStack } from 'tamagui';

export interface TextInfoProps {
  icon: React.ReactNode;
  title: string;
  props?: any;
}

export const TextInfo: React.FC<TextInfoProps> = ({ icon, title, ...props }) => {
  return (
    <XStack alignItems="center" gap="$2">
      {icon}
      <Text  color="$color11" fontWeight="600" fontSize="$1" numberOfLines={1} {...props}>
        {title}
      </Text>
    </XStack>
  );
};

export default TextInfo;
