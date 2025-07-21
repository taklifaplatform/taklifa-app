import { CompanyTransformer } from '@zix/api';
import React, { useMemo } from 'react';

import { ZixTab } from '@zix/ui/common';
import BatchAddProductComponent from './batch-add-product-component';
import ListProductsComponent from './list-products-component';

export type ProfileTabsProps = {
  company: CompanyTransformer;
  tabKey: string;
};

export const ProductsCompanyTab: React.FC<ProfileTabsProps> = ({ company, tabKey }) => {
  const tabs = useMemo(() => {
    const _tabs = [
      {
        key: 'add-products',
        title: 'اضافة المنتجات',
        content: <BatchAddProductComponent />,
      },
      {
        key: 'list-products',
        title: 'قائمة المنتجات',
        content: <ListProductsComponent />,
      },
    ];
    return _tabs;
  }, []);

  return <ZixTab defaultActiveTab={tabKey} tabs={tabs} />;
};

export default ProductsCompanyTab;
