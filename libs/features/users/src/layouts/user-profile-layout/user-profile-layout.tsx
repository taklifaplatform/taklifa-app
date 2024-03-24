import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { AccountSwitcher, AppHeader } from '@zix/ui/layouts';
import { useAuth } from '@zix/services/auth';
import { TouchableOpacity } from 'react-native';
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
  const { user: authUser, getUrlPrefix } = useAuth();

  const renderCurrentAuthUserHeader = () =>
    (user?.id === authUser?.id || !user?.id) && (
      <AppHeader
        showBackButton
        headerTitle={() => <AccountSwitcher />}
        headerRight={() => (
          <TouchableOpacity
            style={{
              borderRadius: 4,
              padding: 5,
            }}
            // onPress={() => router.push(`${getUrlPrefix}/account/settings`)}
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
    <>
      {renderCurrentAuthUserHeader()}
      {renderUserHeader()}
      {children}
    </>
  );
};

export default UserProfileLayout;
