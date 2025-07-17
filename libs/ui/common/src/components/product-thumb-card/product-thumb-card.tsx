import { ClockFading, Edit3, MapPin, SquarePen } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import { useRouter } from 'solito/router';
import { Button, Image, Text, Theme, XStack, YStack } from 'tamagui';
import { TitleInfo } from '../title-info/title-info';
import moment from 'moment';
import { ProductTransformer } from '@zix/api';

export type ProductThumbCardProps = {
  product: ProductTransformer;
  index: number;
  useShowButton?: boolean;
};

export const ProductThumbCard: React.FC<ProductThumbCardProps> = ({
  product,
  index,
  useShowButton = false,
}) => {
  const { width: SCREEN_WIDTH } = Dimensions.get('window');
  const router = useRouter();
  console.log('product', JSON.stringify(product, null, 2));
  return (
      <XStack
        flex={1}
        backgroundColor="$color2"
        borderRadius={'$4'}
        key={index}
        padding={'$4'}
        gap="$4"
        marginVertical={'$2'}
        width={SCREEN_WIDTH - 40}
      >
        <XStack>
          {!!product?.image?.original_url ? (
            <Image
              source={{
                uri: product?.image?.original_url,
              }}
              style={{
                width: 100,
                height: 100,
                borderRadius: 10,
              }}
            />
          ) : (
            <Theme reset>
              <View
                width={100}
                height={100}
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
          <XStack gap="$6">
            <TitleInfo
              icon={<Theme name="accent"><MapPin size={16} color="$color0" /></Theme>}
              title={product?.company?.name || ''}
              flex={1}
              textAlign="left"
            />
            <TitleInfo
              icon={<Theme name="accent"><ClockFading size={16} color="$color0" /></Theme>}
              title={moment(product?.created_at).fromNow()}
            />
          </XStack>

          <XStack
            width={'100%'}
            alignItems="center"
            justifyContent="space-between"
          >
            <XStack gap="$2" alignItems="center">
              <Text fontWeight={'bold'} fontSize={'$3'}>
                {product?.variant?.price || ''}
              </Text>
              {product?.variant?.price && (
                <Theme name="accent">
                  <CustomIcon name="riyal" size="$1" color="$color0" />
                </Theme>
              )}
            </XStack>
            <Theme name="accent">
            <Button
              width={'40%'}
              backgroundColor="$color"
              icon={<SquarePen size={16} color="$color2" />}
              height={35}
              borderRadius={'$4'}
              justifyContent="center"
              alignItems="center"
              onPress={() => router.push(`/app/products/${product.id}/edit`)}
            >
              <Text fontSize={'$1'} fontWeight={'bold'} color="$color2">
                تعديل
              </Text>
            </Button>
            </Theme>
          </XStack>
        </YStack>
      </XStack>
  );
};

export default ProductThumbCard;
