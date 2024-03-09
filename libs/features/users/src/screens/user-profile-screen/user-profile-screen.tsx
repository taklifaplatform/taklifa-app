import { useQuery } from '@tanstack/react-query';
import { DriversService } from '@zix/api';

import { createParam } from 'solito';

import { FullScreenSpinner } from '@zix/ui/common';
import UserProfileLayout from '../../layouts/user-profile-layout/user-profile-layout';

import { YStack } from 'tamagui';
import { UserContactActions } from '../../components/user-contact-actions/user-contact-actions';
import { UserInfoRow } from '../../components/user-info-row/user-info-row';
import { ProfileHeader } from '../../components/profile-header/profile-header';

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

  const renderDriverProfile = () =>
    data?.data && (
      <YStack flex={1} padding="$4" gap="$4">
        <ProfileHeader user={data?.data} />
        <UserInfoRow user={data?.data} />
        <UserContactActions user={data?.data} />
      </YStack>
    );

  return (
    <UserProfileLayout user={data?.data}>
      <>
        {renderLoadingSpinner()}
        {renderDriverProfile()}
      </>
    </UserProfileLayout>
  );
}

export default UserProfileScreen;
