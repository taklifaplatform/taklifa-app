import { Building2, Minus, Plus } from '@tamagui/lucide-icons';
import { TitleInfo } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';
import { Dimensions } from 'react-native';

import { XStack, YStack, Image, Text, Button } from 'tamagui';

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
  const handleUpdateCart = (value: number, state: 'plus' | 'minus') => {
    console.log(value, state);
  };

  return (
    <YStack
      flex={1}
      backgroundColor="$color2"
      borderRadius={'$4'}
      key={index}
      padding={'$4'}
      gap="$4"
      width={SCREEN_WIDTH / 2.4}
      justifyContent="center"
      alignItems="center"
    >
      <XStack flex={1} alignItems="center" justifyContent="center">
        <Image
          source={
            product?.images[0]?.original_url
              ? { uri: product?.images[0]?.original_url || '' }
              : product?.images[0]
          }
          width={140}
          height={130}
          borderRadius={10}
        />
      </XStack>

      <YStack
        flex={1}
        gap="$3"
        justifyContent="flex-start"
        alignItems="flex-start"
      >
        <Text fontWeight={'bold'} fontSize={'$2'} numberOfLines={1}>
          {product?.title || ''}
        </Text>
        <TitleInfo icon={ <Building2 size={20} color="#000000" />} title={product?.description} flex={1}/>
        <XStack gap="$2" alignItems="center">
          <Text fontWeight={'bold'} fontSize={'$3'}>
            {product?.price?.value || ''}
          </Text>
          {product?.price?.value && (
            <CustomIcon name="riyal" size="$1" color="#000000" />
          )}
        </XStack>
      </YStack>
      {useShowButton && (
        <XStack
          width={'100%'}
          justifyContent="space-between"
          alignItems="center"
          borderWidth={1}
          borderColor="$color0"
          borderRadius={10}
          padding={'$3'}
        >
          <Button
            icon={<Plus size={12} color="$color11" />}
            unstyled
            onPress={() => handleUpdateCart(1, 'plus')}
          />
          <Text fontSize={'$2'} fontWeight={'bold'} color="$color11">
            1
          </Text>
          <Button
            icon={<Minus size={12} color="$color11" />}
            unstyled
            onPress={() => handleUpdateCart(1, 'minus')}
          />
        </XStack>
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
        >
          <Text fontSize={'$1'} fontWeight={'bold'} color="#FFFFFF">
            أضف لعرض سعر
          </Text>
        </Button>
      )}
      {!useShowButton && (
        <Button
          theme={'accent'}
          backgroundColor="transparent"
          borderWidth={1}
          borderColor="$color11"
          width={'100%'}
          height={35}
          borderRadius={10}
          justifyContent="center"
          alignItems="center"
          onPress={() => {}}
        >
          <Text fontSize={'$1'} fontWeight={'bold'} color="$color11">
            شاهد التفاصيل
          </Text>
        </Button>
      )}
    </YStack>
  );
};

export default ProductCard;
