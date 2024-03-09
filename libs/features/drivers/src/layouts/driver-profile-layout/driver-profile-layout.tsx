
import { DriverTransformer } from "@zix/api"
import { DashboardSwitcher } from "@zix/features/companies-dashboard"
import { AppHeader } from "@zix/ui/common"
import { CustomIcon } from "@zix/ui/icons"
import { useAuth } from "@zix/utils"
import { TouchableOpacity } from "react-native"
import { useRouter } from "solito/router"
import { View } from 'tamagui'


export type DriverProfileLayoutProps = {
  driver?: DriverTransformer
  children: React.ReactNode
}

export const DriverProfileLayout: React.FC<DriverProfileLayoutProps> = ({
  driver,
  children
}) => {
  const router = useRouter()
  const { user } = useAuth()


  const renderCurrentAuthUserHeader = () => driver?.id === user?.id && (
    <AppHeader
      showBackButton
      headerTitle={() => <DashboardSwitcher />}
      headerRight={() => (
        <TouchableOpacity
          style={{
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

  const renderUserHeader = () => driver?.id !== user?.id && (
    <AppHeader
      showBackButton
      title={driver?.name || '...'}
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


export default DriverProfileLayout;
