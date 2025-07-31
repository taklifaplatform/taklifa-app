import { CompanyTransformer } from '@zix/api';
import React, { useMemo, useState } from 'react';

import { ZixTab } from '@zix/ui/common';
import CompanyServicesTab from '../company-services-tab/company-services-tab';
import ProductsCompanyTab from '../products-company-tab/products-company-tab';

export type ProfileTabsProps = {
  company: CompanyTransformer;
  hideFilters?: boolean;
  setShowSheet?: (show: boolean) => void;
  myStore?: boolean;
};

export const CompanyProfileTabs: React.FC<ProfileTabsProps> = ({
  company,
  hideFilters = false,
  setShowSheet,
  myStore = false,
}) => {
  
  const tabs = useMemo(() => {
    const _tabs = [
      {
        key: 'products',
        title: 'المنتجات',
        content: (
          <ProductsCompanyTab
            company={company}
            hideFilters={hideFilters}
            setShowSheet={setShowSheet}
            myStore={myStore}
          />
        ),
      },
      {
        key: 'services',
        title: 'الخدمات',
        content: (
          <CompanyServicesTab
            company={company}
            hideFilters={hideFilters}
            setShowSheet={setShowSheet}
          />
        ),
      },
    ];
    return _tabs;
  }, [company]);

  return <ZixTab defaultActiveTab={'products'} tabs={tabs} />;
};

export default CompanyProfileTabs;
