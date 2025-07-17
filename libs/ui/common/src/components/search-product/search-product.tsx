import { Search } from '@tamagui/lucide-icons';
import { Input, XStack } from 'tamagui';

export type SearchProductProps = {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
};

export const SearchProduct: React.FC<SearchProductProps> = ({
  placeholder = 'ابحث عن منتج',
  value,
  onChangeText,
}) => {
  return (
    <XStack
      theme={'accent'}
      backgroundColor={'transparent'}
      borderRadius="$4"
      alignItems="center"
      paddingHorizontal="$2"
      height="$3"
      borderWidth={1}
      borderColor="$color0"
      gap="$2"
    >
      <Input
        placeholder={placeholder}
        backgroundColor="transparent"
        placeholderTextColor="$color0"
        borderWidth={0}
        value={value}
        onChangeText={onChangeText}
      />
      <Search size={20} color="$color0" />
    </XStack>
  );
};

export default SearchProduct;
