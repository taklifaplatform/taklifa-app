import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { YStack } from 'tamagui';
import BatchAddProductComponent from '../../components/product-tabs/batch-add-product-component';

export const AiProductCreatorsScreen = () => {
  return (
    <ScreenLayout>
      <AppHeader title="اضافة منتج جديد" showBackButton />
      <YStack flex={1} padding="$3" marginTop="$3">
        <BatchAddProductComponent />
      </YStack>
    </ScreenLayout>
  );
};

export default AiProductCreatorsScreen;
