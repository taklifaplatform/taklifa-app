import { useQuery } from '@tanstack/react-query';
import { DriversService, UserService } from '@zix/api';

import { useMixpanel } from '@zix/services/auth';
import { FullScreenSpinner } from '@zix/ui/common';
import { ScreenLayout } from '@zix/ui/layouts';
import { RefreshControl } from 'react-native-gesture-handler';
import { createParam } from 'solito';
import { ScrollView, YStack } from 'tamagui';
import ProfileHeader from '../../components/profile-header/profile-header';
import ProfileTabs from '../../components/tabs/profile-tabs/profile-tabs';
import UserContactActions from '../../components/user-contact-actions/user-contact-actions';
import UserInfoRow from '../../components/user-info-row/user-info-row';
import UserProfileLayout from '../../layouts/user-profile-layout/user-profile-layout';
const { useParam } = createParam<{ user: string }>();

export function UserProfileScreen() {
  const [userId] = useParam('user');
  useMixpanel(`User Profile Screen view - User:${userId}`)
  
  const { data, refetch, isLoading } = useQuery({
    queryFn() {
      if (!userId) {
        return;
      }

      // TODO: if we gonna enable public profile add ability to retreive user by id
      return UserService.retrieveUser()

      // return DriversService.retrieveDriver({
      //   driver: userId,
      // });
    },
    queryKey: ['DriversService.retrieveDriver', userId],
  });

  const renderLoadingSpinner = () => !data?.data?.id && <FullScreenSpinner />;

  const renderUserProfile = () =>
    data?.data && (
      <ScrollView
        flex={1}
        refreshControl={
          <RefreshControl refreshing={isLoading} onRefresh={refetch} />
        }
      >
        <YStack padding="$4" marginBottom="$4" gap="$4">
          <YStack
            backgroundColor="$color2"
            borderRadius="$5"
            paddingHorizontal="$4"
            paddingBottom="$4"
            gap="$6"
          >
            <ProfileHeader user={data.data} />
            <UserInfoRow user={data.data} />
          </YStack>
          <UserContactActions user={data.data} />
        </YStack>
        <ProfileTabs user={data.data} />
      </ScrollView>
    );

  return (
    <ScreenLayout>
      <UserProfileLayout user={data?.data}>
        <>
          {renderLoadingSpinner()}
          {renderUserProfile()}
        </>
      </UserProfileLayout>
    </ScreenLayout>
  );
}

export default UserProfileScreen;
