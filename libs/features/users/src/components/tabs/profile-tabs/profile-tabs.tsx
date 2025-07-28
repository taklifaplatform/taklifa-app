import { UserTransformer } from '@zix/api';
import { t } from 'i18next';
import React, { useMemo } from 'react';

import { ZixTab } from '@zix/ui/common';
import AboutUserTab from '../about-user-tab/about-user-tab';
import UserReviewsTab from '../user-reviews-tab/user-reviews-tab';

export type ProfileTabsProps = {
  user: UserTransformer
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
