import React from 'react';
import { Text, View } from 'tamagui';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';


export const ProductManagerScreen = () => {
  return <ScreenLayout>
  <AppHeader title="مدير المنتجات" showBackButton />
  <Text>ProductManagerScreen</Text>
</ScreenLayout>
};

export default ProductManagerScreen;