import { DriverTransformer } from '@zix/api';
import { DashboardSwitcher } from '@zix/features/companies-dashboard';
import { AppHeader } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useAuth } from '@zix/utils';
import { TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useRouter } from 'solito/router';

export type UserProfileLayoutProps = {
  user?: DriverTransformer;
  children: React.ReactNode;
};

export const UserProfileLayout: React.FC<UserProfileLayoutProps> = ({
  user,
  children,
}) => {
  const router = useRouter();
  const { user: authUser } = useAuth();

  const renderCurrentAuthUserHeader = () =>
    user?.id === authUser?.id && (
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
    );

  const renderUserHeader = () =>
    user?.id !== authUser?.id && (
      <AppHeader
        showBackButton
        title={user?.name || '...'}
        headerBackgroundColor="transparent"
      />
    );

  return (
    <SafeAreaView style={{ flex: 1 }} edges={['bottom', 'left', 'right']}>
      {renderCurrentAuthUserHeader()}
      {renderUserHeader()}
      {children}
    </SafeAreaView>
  );
};

export default UserProfileLayout;
