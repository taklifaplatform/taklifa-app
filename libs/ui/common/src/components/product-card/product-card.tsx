import { Building2 } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, Image, Text, Theme, XStack, YStack } from 'tamagui';
import { ManageCountProduct } from '../manage-count-product/manage-count-product';
import { TitleInfo } from '../title-info/title-info';

export type ProductCardProps = {
  product: any;
  index: number;
  useShowButton?: boolean;
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  index,
  useShowButton = false,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const router = useRouter();
  const [count, setCount] = useState(1);
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
      <XStack flex={1} alignItems="center" justifyContent="center">
        {!!product?.image?.original_url ? (
          <Image
            source={{
              uri: product?.original_url,
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
              borderRadius={10}
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

      <YStack
        flex={1}
        gap="$3"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Text fontWeight={'bold'} fontSize={'$2'} numberOfLines={1}>
          {product?.name || ''}
        </Text>
        <XStack gap="$2" alignItems="center" justifyContent="flex-start">
          <Text fontWeight={'bold'} fontSize={'$3'}>
            {product?.variant?.price || ''}
          </Text>
          {product?.variant?.price && (
            <Theme name="accent">
              <CustomIcon name="riyal" size="$1" color="#000000" />
            </Theme>
          )}
        </XStack>
      </YStack>
      {useShowButton && (
        <ManageCountProduct
          value={count}
          onUpdate={setCount}
          width={'100%'}
          height={30}
          size={10}
        />
      )}
      {useShowButton && (
        <Button
          theme={'accent'}
          width={'100%'}
          height={35}
          borderRadius={10}
          justifyContent="center"
          alignItems="center"
          onPress={() => {}}
          disabled={product.is_available}
        >
          <Text fontSize={'$1'} fontWeight={'bold'} color="$color2">
            أضف لعرض سعر
          </Text>
        </Button>
      )}
      {!useShowButton && (
        <Button
          theme={'accent'}
          backgroundColor="transparent"
          pressStyle={{
            backgroundColor: 'gray',
          }}
          borderWidth={1}
          borderColor="$color0"
          width={'100%'}
          height={35}
          borderRadius={10}
          justifyContent="center"
          alignItems="center"
          onPress={() => router.push(`/app/products/${product.id}`)}
        >
          <Text fontSize={'$1'} fontWeight={'bold'} color="$color0">
            شاهد التفاصيل
          </Text>
        </Button>
      )}
    </YStack>
  );
};

export default ProductCard;
