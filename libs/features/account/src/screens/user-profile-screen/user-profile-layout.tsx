import { DriverTransformer } from "@zix/api"
import { DashboardSwitcher } from "@zix/features/companies-dashboard"
import { AppHeader } from "@zix/ui/common"
import { CustomIcon } from "@zix/ui/icons"
import { useAuth } from "@zix/utils"
import { TouchableOpacity } from "react-native"
import { useRouter } from "solito/router"
import { View } from 'tamagui'


export type UserProfileProps = {
  user?: DriverTransformer
  children: React.ReactNode
}

export const UserProfileLayout: React.FC<UserProfileProps> = ({
  user,
  children
}) => {
  const router = useRouter()
  const { user: currentAuthUser } = useAuth()


  const renderCurrentAuthUserHeader = () => user?.id === currentAuthUser?.id && (
    <AppHeader
      showBackButton
      headerTitle={() => <DashboardSwitcher />}
      headerRight={() => (
        <TouchableOpacity
          style={{
            backgroundColor: '#F6F6F6',
            borderRadius: 4,
            padding: 5,
          }}
          onPress={() => router.push('/account/settings')}
        >
          <CustomIcon name="more" color="black" size="$3" />
        </TouchableOpacity>
      )}
      headerBackgroundColor="transparent"
    />
  )

  const renderUserHeader = () => user?.id !== currentAuthUser?.id && (
    <AppHeader
      showBackButton
      title={user?.name || '...'}
      headerBackgroundColor="transparent"
    />
  )

  return (
    <View flex={1}>
      {renderCurrentAuthUserHeader()}
      {renderUserHeader()}
      {children}
    </View>
  )
}
