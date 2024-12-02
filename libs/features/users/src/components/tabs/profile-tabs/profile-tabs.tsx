import { DriverTransformer } from '@zix/api';
import React, { useMemo } from 'react';
import { t } from 'i18next';

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

  const tabs = useMemo(() => {
    const _tabs = [
      {
        key: 'about',
        title: `${t('common:tab-about')}`,
        content: <AboutUserTab user={user} />
      }
    ]

    if (user.vehicle) {
      _tabs.push({
        key: 'vehicle',
        title: `${t('common:tab-vehicles')}`,
        content: <UserVehicleTab user={user} />
      })
    }

    _tabs.push({
      key: 'reviews',
      title: `${t('common:tab-review')}`,
      content: <UserReviewsTab user={user} />
    })
    return _tabs
  }, [user])

  return (
    <ZixTab
      defaultActiveTab='about'
      tabs={tabs}
    />
  );
}

export default ProfileTabs;
