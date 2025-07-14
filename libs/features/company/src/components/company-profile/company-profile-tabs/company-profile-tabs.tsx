import { CompanyTransformer } from '@zix/api';
import React, { useMemo } from 'react';

import { ZixTab } from '@zix/ui/common';
import CompanyServicesTab from '../company-services-tab/company-services-tab';
import ProductsCompanyTab from '../products-company-tab/products-company-tab';

export type ProfileTabsProps = {
  company: CompanyTransformer
}

export const CompanyProfileTabs: React.FC<ProfileTabsProps> = ({
  company
}) => {
  const tabs = useMemo(() => {
    const _tabs = [
      {
        key: 'products',
        title: 'المنتجات',
        content: <ProductsCompanyTab company={company} />
      },
      {
        key: 'services',
        title: 'الخدمات',
        content: <CompanyServicesTab company={company} />
      },
    ]
    return _tabs
  }, [company])

  return (
    <ZixTab
      defaultActiveTab='products'
      tabs={tabs}
    />
  );
}


export default CompanyProfileTabs;
