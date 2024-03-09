

import { useQuery } from '@tanstack/react-query';
import { DriversService } from '@zix/api';
import { FullScreenSpinner } from '@zix/ui/common';
import { createParam } from 'solito';
import UserProfile from './user-profile';
import { UserProfileLayout } from './user-profile-layout';

const { useParam } = createParam<{ user: string }>();

export function UserProfileScreen() {
  const [userId] = useParam('user');

  const { data } = useQuery({
    queryFn() {
      return DriversService.retrieveDriver({
        driver: userId,
      });
    },
    queryKey: ['DriversService.retrieveDriver', userId]
  })

  return (
    <UserProfileLayout user={data?.data}>
      {
        data?.data ? (
          <UserProfile user={data?.data} />
        ) : (
          <FullScreenSpinner />
        )
      }
    </UserProfileLayout>
  );
}


export default UserProfileScreen;
