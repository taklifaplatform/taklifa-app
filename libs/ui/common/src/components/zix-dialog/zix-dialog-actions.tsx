import { SizeTokens, XStack, XStackProps } from 'tamagui'

export type ZixDialogActionsProps = XStackProps & {
  contentPadding?: SizeTokens
}

export function ZixDialogActions({
  children,
  contentPadding = '$4',
  ...rest
}: ZixDialogActionsProps) {
  return (
    <XStack
      justifyContent={'flex-end'}
      alignItems={'center'}
      paddingLeft={contentPadding}
      paddingRight={contentPadding}
      paddingBottom={contentPadding}
      {...rest}
    >
      {children}
    </XStack>
  )
}

export function ZixDialogHeader({
  children,
  contentPadding = '$4',
  ...rest
}: ZixDialogActionsProps) {
  return (
    <XStack
      justifyContent={'space-between'}
      alignItems={'center'}
      paddingLeft={contentPadding}
      paddingRight={contentPadding}
      paddingTop={contentPadding}
      {...rest}
    >
      {children}
    </XStack>
  )
}
