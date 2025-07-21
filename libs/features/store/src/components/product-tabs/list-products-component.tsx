import {
  ChevronUp,
  LayoutGrid,
  LayoutList,
  Search,
} from '@tamagui/lucide-icons';
import { SearchProduct, ZixButton, ZixDialog } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useState } from 'react';
import { FlatList } from 'react-native';
import { Input, Text, XStack, YStack } from 'tamagui';
import { ProductCard } from './product-card';

export const ListProductsComponent = () => {
  const [mode, setMode] = useState<'list' | 'grid'>('list');
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState([
    {
      id: 1,
      title: 'جهاز تكييف مركزي بقدرة 30 طن',
      description:
        'تتميز هذه الوحدة بقدرتها الفائقة على تبريد المساحات الواسعة، مما يجعلها مثالية للمكاتب الكبيرة والمراكز التجارية.....',
      price: 75.0,
      image: require('./tak1.png'),
    },
    {
      id: 2,
      title: 'باب المنيوم سنقل',
      description:
        'هذا المكيف المحمول يتميز بتصميمه المدمج وسهولة نقله، مما يجعله خيارًا رائعًا للتبريد المؤقت في أي مكان.....',
      price: 100.0,
      image: require('./tak2.png'),
    },
    {
      id: 3,
      title: 'مكيف سبليت بقدرة 2 طن',
      description:
        'مع نظام تشغيل هادئ وكفاءة عالية، يوفر هذا المكيف حلولًا مثالية لتبريد الغرف المتوسطة بحجمها.....',
      price: 100.0,
      image: require('./tak3.png'),
    },
    {
      id: 4,
      title: 'باب المنيوم سنقل',
      description:
        'مع نظام تشغيل هادئ وكفاءة عالية، يوفر هذا المكيف حلولًا مثالية لتبريد الغرف المتوسطة بحجمها.....',
      price: 100.0,
      image: require('./tak4.png'),
    },
    {
      id: 5,
      title: 'باب المنيوم سنقل',
      description:
        'مع نظام تشغيل هادئ وكفاءة عالية، يوفر هذا المكيف حلولًا مثالية لتبريد الغرف المتوسطة بحجمها.....',
      price: 100.0,
      image: require('./tak5.png'),
    },
  ]);
  const handleDelete = (id: number) => {
    setProducts(products.filter((product) => product.id !== id));
  };
  const renderFilterByType = () => {
    return (
      <ZixDialog
        title={'جميع الفئات'}
        open={isOpen}
        onOpenChange={setIsOpen}
        contentPadding="$1"
        snapPoints={[25, 50]}
        disableRemoveScroll
        trigger={
          <XStack
            theme={'accent'}
            backgroundColor={'transparent'}
            borderRadius="$4"
            alignItems="center"
            paddingHorizontal="$2"
            height="$3"
            borderWidth={1}
            borderColor="$color0"
            gap="$2"
          >
            <Text fontWeight="bold" fontSize={'$3'}>
              جميع الفئات
            </Text>
            <ChevronUp size={20} color="$color0" />
          </XStack>
        }
      ></ZixDialog>
    );
  };

  return (
    <YStack flex={1} gap="$3">
      <XStack alignItems="center" justifyContent="space-between">
        <ZixButton
          icon={
            mode === 'grid' ? (
              <LayoutGrid size={18} color={'white'} />
            ) : (
              <LayoutList size={18} color={'white'} />
            )
          }
          onPress={() => setMode(mode === 'grid' ? 'list' : 'grid')}
          padding="$2"
          borderRadius="$2"
          backgroundColor={'green'}
          unstyled
        />
        {renderFilterByType()}

        <SearchProduct value={search} onChangeText={setSearch} />
      </XStack>
      <FlatList
        data={products}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProductCard product={item} mode={mode} onDelete={handleDelete} />
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{
          gap: 10,
          paddingBottom: 60,
        }}
      />
      <ZixButton
        theme={'accent'}
        position="absolute"
        bottom={0}
        right={0}
        width={'100%'}
        backgroundColor="$color0"
        icon={<CustomIcon name="add_store" size={20} color="$color10" />}
      >
        <Text fontWeight="500" fontSize={'$3'} color="$color10">
          نشر منتجات في متجري
        </Text>
      </ZixButton>
    </YStack>
  );
};

export default ListProductsComponent;
