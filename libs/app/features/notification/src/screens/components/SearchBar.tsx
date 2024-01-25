import { Search } from '@tamagui/lucide-icons'
import { Input, XStack } from '@zix/app/ui/core'

export default function SearchBar({search, setSearch}) {

  return (
    <XStack
    padding="$4"
    paddingVertical="$2"
    alignItems="center"
    justifyContent="space-between"
  >
    <XStack
      alignItems="center"
      flex={1}
      borderWidth="$0.5"
      borderRadius="$5"
      borderColor="$gray10"
      paddingLeft="$2"
    >
      <Search size="$1" color={'#757575'} />
      <Input
        size="$4"
        placeholder={'Search here'}
        flex={1}
        borderColor="transparent"
        focusStyle={{ borderColor: 'transparent' }}
        returnKeyType="search"
        value={search}
        onChangeText={(text) => {
          setSearch(text);
        }}
      />
      
    </XStack>
  </XStack>
  )
}