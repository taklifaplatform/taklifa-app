import { ClockFading, MapPin, SquarePen } from '@tamagui/lucide-icons';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';
import { Dimensions } from 'react-native';
import { useRouter } from 'solito/router';
import { Image, Text, Theme, XStack, YStack } from 'tamagui';
import { TitleInfo } from '../title-info/title-info';
import moment from 'moment';
import { ProductTransformer } from '@zix/api';
import { ZixButton } from '../zix-button/zix-button';

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
          <CustomIcon name="image-blank" size={100} color="$color2" />
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
        <XStack gap="$4" flex={1}>
          <TitleInfo
            icon={
              <Theme name="accent">
                <MapPin size={16} color="$color0" />
              </Theme>
            }
            title={product?.name || ''}
            textAlign="left"
          />
          <TitleInfo
            icon={
              <Theme name="accent">
                <ClockFading size={16} color="$color0" />
              </Theme>
            }
            title={moment(product?.created_at).fromNow()}
          />
        </XStack>

        <XStack
          width={'100%'}
          justifyContent="space-between"
          alignItems="center"
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
            <ZixButton
              width={'50%'}
              backgroundColor="$color0"
              icon={<SquarePen size={12} color="$color2" />}
              height={35}
              borderRadius={'$4'}
              justifyContent="center"
              alignItems="center"
              onPress={() => router.push(`/app/products/${product.id}/edit`)}
              fontSize={'$1'}
              fontWeight={'bold'}
              color="$color2"
            >
              تعديل
            </ZixButton>
          </Theme>
        </XStack>
      </YStack>
    </XStack>
  );
};

export default ProductThumbCard;
