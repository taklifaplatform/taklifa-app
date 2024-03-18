import { DriverTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { AccountSwitcher, AppHeader } from '@zix/ui/layouts';
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
        headerTitle={() => <AccountSwitcher />}
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
      />
    );

  const renderUserHeader = () =>
    user?.id !== authUser?.id && (
      <AppHeader
        showBackButton
        title={user?.name || '...'}
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
