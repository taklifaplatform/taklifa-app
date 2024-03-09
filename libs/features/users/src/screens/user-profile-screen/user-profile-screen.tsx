import { useQuery } from '@tanstack/react-query';
import { DriversService } from '@zix/api';

import { createParam } from 'solito';

import { FullScreenSpinner } from '@zix/ui/common';
import UserProfileLayout from '../../layouts/user-profile-layout/user-profile-layout';

import { ScrollView, YStack } from 'tamagui';
import { ProfileHeader } from '../../components/profile-header/profile-header';
import ProfileTabs from '../../components/tabs/profile-tabs/profile-tabs';
import { UserContactActions } from '../../components/user-contact-actions/user-contact-actions';
import { UserInfoRow } from '../../components/user-info-row/user-info-row';

const { useParam } = createParam<{ user: string }>();

export function UserProfileScreen() {
  const [userId] = useParam('user');

  const { data } = useQuery({
    queryFn() {
      return DriversService.retrieveDriver({
        driver: userId,
      });
    },
    queryKey: ['DriversService.retrieveDriver', userId],
  });

  const renderLoadingSpinner = () => !data?.data && <FullScreenSpinner />;

  const renderUserProfile = () =>
    data?.data && (
      <ScrollView flex={1}>
        <YStack padding="$4" marginBottom='$4' gap="$4">
          <YStack
            backgroundColor='$color2'
            borderRadius='$5'
            paddingHorizontal='$4'
            paddingBottom='$4'
            gap='$6'
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
    <UserProfileLayout user={data?.data}>
      <>
        {renderLoadingSpinner()}
        {renderUserProfile()}
      </>
    </UserProfileLayout>
  );
}

export default UserProfileScreen;
