import { CompanyTransformer } from '@zix/api';
import React, { useMemo } from 'react';

import { ZixTab } from '@zix/ui/common';
import { Text, View } from 'tamagui';
import AboutCompanyTab from '../about-company-tab/about-company-tab';
import CompanyVehiclesTab from '../company-vehicles-tab/company-vehicles-tab';

export type ProfileTabsProps = {
  company: CompanyTransformer
}

export const CompanyProfileTabs: React.FC<ProfileTabsProps> = ({
  company
}) => {

  const tabs = useMemo(() => {
    const _tabs = [
      {
        key: 'about',
        title: 'About',
        content: <AboutCompanyTab company={company} />
      }
    ]

    if (company.vehicles_count) {
      _tabs.push({
        key: 'vehicles',
        title: 'Vehicles',
        content: <CompanyVehiclesTab company={company} />
      })
    }

    _tabs.push({
      key: 'drivers',
      title: 'Drivers',
      content: (
        <View>
          <Text>
            Hello
          </Text>
        </View>
      )
      // content: <UserReviewsTab user={user} />
    })

    _tabs.push({
      key: 'reviews',
      title: 'Reviews',
      content: (
        <View>
          <Text>
            Hello
          </Text>
        </View>
      )
      // content: <UserReviewsTab user={user} />
    })
    return _tabs
  }, [company])

  return (
    <ZixTab
      defaultActiveTab='about'
      tabs={tabs}
    />
  );
}


export default CompanyProfileTabs;
