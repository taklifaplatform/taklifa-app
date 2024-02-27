import { ScrollView, SizeTokens, YStack, YStackProps } from 'tamagui'

export type ZixDialogContentProps = YStackProps & {
  contentPadding?: SizeTokens
}

export function ZixDialogContent({
  children,
  contentPadding = '$4',
  ...rest
}: ZixDialogContentProps) {
  return (
    <ScrollView padding={contentPadding}>
      <YStack space {...rest}>
        {children}
      </YStack>
    </ScrollView>
  )
}
