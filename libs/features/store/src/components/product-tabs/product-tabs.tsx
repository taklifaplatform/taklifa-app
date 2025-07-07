import { CompanyTransformer } from '@zix/api';
import React, { useMemo } from 'react';

import { ZixTab } from '@zix/ui/common';
import AddProductComponent from './add-product-component';
import ListProductsComponent from './list-products-component';

export type ProfileTabsProps = {
  company: CompanyTransformer;
};

export const ProductsCompanyTab: React.FC<ProfileTabsProps> = ({ company }) => {
  const tabs = useMemo(() => {
    const _tabs = [
      {
        key: 'add-products',
        title: 'اضافة المنتجات',
        content: <AddProductComponent />,
      },
      {
        key: 'list-products',
        title: 'قائمة المنتجات',
        content: <ListProductsComponent />,
      },
    ];
    return _tabs;
  }, []);

  return <ZixTab defaultActiveTab="add-products" tabs={tabs} />;
};

export default ProductsCompanyTab;
