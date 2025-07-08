import React from 'react';
import { View, Text, YStack } from 'tamagui';
import ProductsCompanyTab from '../../components/product-tabs/product-tabs';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';

export const ListAiProductsScreen = () => {
  return (
    <ScreenLayout>
      <AppHeader title="اضافة منتج جديد" showBackButton />
      <YStack flex={1} padding="$3" marginTop="$3">
        <ProductsCompanyTab company={null as any} tabKey="list-products" />
      </YStack>
    </ScreenLayout>
  );
};

export default ListAiProductsScreen;
