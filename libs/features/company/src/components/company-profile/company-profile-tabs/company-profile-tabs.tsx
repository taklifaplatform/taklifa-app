import { CompanyTransformer } from '@zix/api';
import React, { useMemo } from 'react';

import { ZixTab } from '@zix/ui/common';
import AboutCompanyTab from '../about-company-tab/about-company-tab';
import CompanyVehiclesTab from '../company-vehicles-tab/company-vehicles-tab';
import CompanyDriversTab from '../company-drivers-tab/company-drivers-tab';
import CompanyReviewsTab from '../company-reviews-tab/company-reviews-tab';
import { t } from 'i18next';
import CompanyServicesTab from '../company-services-tab/company-services-tab';

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
        title: `${t('common:tab-about')}`,
        content: <AboutCompanyTab company={company} />
      }
    ]

    if (company.vehicles_count) {
      _tabs.push({
        key: 'vehicles',
        title: `${t('common:tab-vehicles')}`,
        content: <CompanyVehiclesTab company={company} />
      })
    }

    _tabs.push({
      key: 'drivers',
      title: `${t('common:tab-drivers')}`,
      content: <CompanyDriversTab company={company} />
    })

    _tabs.push({
      key: 'services',
      title: `${t('common:tab-services')}`,
      content: <CompanyServicesTab company={company} />
    })
    // _tabs.push({
    //   key: 'reviews',
    //   title: `${t('common:tab-review')}`,
    //   content: <CompanyReviewsTab company={company} />
    // })
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
