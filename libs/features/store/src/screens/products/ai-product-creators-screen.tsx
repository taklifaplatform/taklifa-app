import { BatchProductTransformer } from '@zix/api';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { useMemo, useState } from 'react';
import { Button, View, XStack, YStack } from 'tamagui';
import BatchAddProductComponent from '../../components/product-tabs/batch-add-product-component';
import ListProductsComponent from '../../components/product-tabs/list-products-component';

export const AiProductCreatorsScreen = () => {
  const [activeTab, setActiveTab] = useState('add-products');
  const [batchProduct, setBatchProduct] = useState<BatchProductTransformer | null>(null);
  // in here we should handle the ai product creation & show the result
  const tabs = useMemo(() => {
    const _tabs = [
      {
        key: 'add-products',
        title: 'اضافة المنتجات',
        content: <BatchAddProductComponent onSuccess={(data) => {
          setBatchProduct(data);
          setActiveTab('list-products');
        }} />,
      },
      {
        key: 'list-products',
        title: 'قائمة المنتجات',
        content: <ListProductsComponent batchProduct={batchProduct || ({} as BatchProductTransformer)} />,
      },
    ];
    return _tabs;
  }, [batchProduct]);


  return (
    <ScreenLayout>
      <AppHeader title="اضافة منتج جديد" showBackButton />
      <YStack flex={1} padding="$3" marginTop="$3">
        <XStack marginHorizontal="$4" backgroundColor="transparent" borderWidth={1} borderColor="$color3" borderRadius="$4">
          {tabs.map((tab) => (
            <Button
              key={`tab-title-${tab.key}`}
              flex={1}
              theme={'accent'}
              backgroundColor={activeTab === tab.key ? "$color1" : "transparent"}
              onPress={() => setActiveTab(tab.key)}
              fontWeight="bold"
              fontSize="$1"
              color={activeTab === tab.key ? "$color2" : "$color12"}
              paddingHorizontal={tabs?.length > 3 ? "$1" : "$2"}
            >
              {tab.title}
            </Button>
          ))}
        </XStack>
        <View flex={1} padding="$4" >
          {tabs
            .filter((tab) => tab.key === activeTab)
            .map((tab) => (
              <View flex={1} key={`tab-content-${tab.key}`}>{tab.content}</View>
            ))}
        </View>
      </YStack>
    </ScreenLayout>
  );
};

export default AiProductCreatorsScreen;
