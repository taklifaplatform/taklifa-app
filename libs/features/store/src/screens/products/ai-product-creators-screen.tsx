import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import React from 'react';
import { Text, View, YStack } from 'tamagui';
import ProductsCompanyTab from '../../components/product-tabs/product-tabs';

export const AiProductCreatorsScreen = () => {
  return (
    <ScreenLayout>
      <AppHeader title="اضافة منتج جديد" showBackButton />
      <YStack flex={1} padding="$3" marginTop="$3">
        <ProductsCompanyTab company={null as any} />
      </YStack>
    </ScreenLayout>
  );
};

export default AiProductCreatorsScreen;
