import { useQuery } from '@tanstack/react-query';
import { DriversService } from '@zix/api';

import { createParam } from 'solito';

import { FullScreenSpinner } from '@zix/ui/common';
import DriverProfileLayout from '../../layouts/driver-profile-layout/driver-profile-layout';

import { YStack } from 'tamagui';
import DriverContactActions from '../../components/driver-contact-actions/driver-contact-actions';
import DriverStatsRow from '../../components/driver-stats-row/driver-stats-row';
import { ProfileHeader } from '../../components/profile-header/profile-header';

const { useParam } = createParam<{ user: string }>();

export function DriverProfileScreen() {
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
        <DriverStatsRow driver={data?.data} />
        <DriverContactActions driver={data?.data} />
      </YStack>
    );

  return (
    <DriverProfileLayout driver={data?.data}>
      <>
        {renderLoadingSpinner()}
        {renderDriverProfile()}
      </>
    </DriverProfileLayout>
  );
}

export default DriverProfileScreen;
