import { useAuth } from "@zix/services/auth"
import { FullScreenSpinner } from "@zix/ui/common"
import { XStack, YStack } from "tamagui"
import AccountSettingsMenu from "../account-settings-menu/account-settings-menu"


export type SettingsLayoutProps = {
  /**
   * web-only
   */
  isSettingsHome?: boolean
  /**
   * web-only
   */
  children?: React.ReactNode
}

export const AccountSettingsLayout = ({ children, isSettingsHome = false }: SettingsLayoutProps) => {
  const { isLoading, user } = useAuth()

  const renderContent = () => (isLoading || !user) ? (
    <FullScreenSpinner />
  ) : (
    <YStack width="100%">{children}</YStack>
  )

  return (
    <XStack flex={1}>
      <YStack
        backgroundColor="$color4"
        $sm={{ flex: 1, display: isSettingsHome ? 'flex' : 'none' }}
        // this file is web-only so we can safely use CSS
        style={{
          transition: '200ms ease width',
        }}
        $gtSm={{
          width: 300,
        }}
        $gtLg={{
          width: 400,
        }}
      >
        <AccountSettingsMenu />
      </YStack>
      <YStack marginVertical="$10" flex={1} alignItems="center" $sm={{ display: isSettingsHome ? 'none' : 'block' }}>
        {renderContent()}
      </YStack>
    </XStack>
  )
}


export default AccountSettingsLayout;
