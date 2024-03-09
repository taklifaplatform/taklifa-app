import { DriverTransformer } from '@zix/api';
import React from 'react';

import { ZixTab } from '@zix/ui/common';
import AboutUserTab from '../about-user-tab/about-user-tab';
import UserReviewsTab from '../user-reviews-tab/user-reviews-tab';
import UserVehicleTab from '../user-vehicle-tab/user-vehicle-tab';

export type ProfileTabsProps = {
  user: DriverTransformer
}

export const ProfileTabs: React.FC<ProfileTabsProps> = ({
  user
}) => {

  return (
    <ZixTab
      defaultActiveTab='about'
      tabs={[
        {
          key: 'about',
          title: 'About',
          content: <AboutUserTab user={user} />
        },
        {
          key: 'vehicle',
          title: 'Vehicle',
          content: <UserVehicleTab user={user} />
        },
        {
          key: 'reviews',
          title: 'Reviews',
          content: <UserReviewsTab user={user} />
        }
      ]}

    />
  );
}

export default ProfileTabs;
