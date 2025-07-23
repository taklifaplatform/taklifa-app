import { CustomIcon } from '@zix/ui/icons';
import React, { useState } from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { useRouter } from 'solito/router';
import { Image, Text, Theme, XStack, YStack, View } from 'tamagui';
import { ManageCountProduct } from '../manage-count-product/manage-count-product';
import { ProductTransformer } from '@zix/api';
import { ZixButton } from '../zix-button/zix-button';
import { useCart } from '@zix/services/auth';

export type ProductCardProps = {
  product: ProductTransformer;
  index: number;
  useShowButton?: boolean;
  setShowSheet?: (show: boolean) => void;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  useShowButton = false,
  setShowSheet,
}) => {
  const { addItemToCart } = useCart();
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const router = useRouter();
  const [count, setCount] = useState(1);

  const [isAddingToCart, setIsAddingToCart] = useState(false);
  async function onAddToCart() {
    setIsAddingToCart(true);
    await addItemToCart(product, count);
    setIsAddingToCart(false);
    setCount(1);
  }
  //
  return (
    <YStack
      flex={1}
      backgroundColor="$color2"
      borderRadius={'$4'}
      key={index}
      padding={'$4'}
      gap="$4"
      width={SCREEN_WIDTH / 2.4}
    >
      <TouchableOpacity
        onPress={() => {
          if (setShowSheet) {
            setShowSheet(false);
          }
          router.push(`/app/products/${product.id}`);
        }}
        style={{
          flex: 1,
          gap: 10,
        }}
      >
        <XStack flex={1} alignItems="center" justifyContent="center">
          {!!product?.image?.original_url ? (
            <Image
              source={{
                uri: product?.image?.original_url,
              }}
              width={140}
              height={130}
              borderRadius={10}
            />
          ) : (
            <Theme reset>
              <View
                width={140}
                height={130}
                backgroundColor="$color2"
                borderRadius={'$4'}
                borderWidth={1}
                borderColor="$color8"
                overflow="hidden"
                alignItems="center"
                justifyContent="center"
              >
                <CustomIcon name="image-blank" size={100} color="$color2" />
              </View>
            </Theme>
          )}
        </XStack>

        <YStack gap="$3" justifyContent="flex-start" alignItems="flex-start">
          <Text fontWeight={'bold'} fontSize={'$2'} numberOfLines={1}>
            {product?.name || ''}
          </Text>
          <XStack gap="$2" alignItems="center" justifyContent="flex-start">
            <Text fontWeight={'bold'} fontSize={'$3'}>
              {product?.variant?.price || ''}
            </Text>
            {product?.variant?.price && (
              <Theme name="accent">
                <CustomIcon name="riyal" size="$1" color="$color0" />
              </Theme>
            )}
          </XStack>
        </YStack>
      </TouchableOpacity>
      {useShowButton && (
        <ManageCountProduct
          value={count}
          onUpdate={setCount}
          width={'100%'}
          height={30}
          size={15}
        />
      )}
      {useShowButton && (
        <ZixButton
          theme={'accent'}
          height={35}
          justifyContent="center"
          alignItems="center"
          onPress={() => onAddToCart()}
          fontSize={12}
          backgroundColor="$color1"
          fontWeight={'bold'}
          color="$color2"
          loading={isAddingToCart}
        >
          أضف لعرض سعر
        </ZixButton>
      )}
      {!useShowButton && (
        <ZixButton
          theme={'accent'}
          unstyled
          backgroundColor="transparent"
          pressStyle={{
            backgroundColor: 'gray',
          }}
          borderWidth={1}
          borderColor="$color0"
          borderRadius={'$4'}
          // width={'100%'}
          height={35}
          justifyContent="center"
          alignItems="center"
          onPress={() => router.push(`/app/products/${product.id}`)}
          fontSize={'$1'}
          fontWeight={'bold'}
          color="$color0"
        >
          شاهد التفاصيل
        </ZixButton>
      )}
    </YStack>
  );
};

export default ProductCard;
