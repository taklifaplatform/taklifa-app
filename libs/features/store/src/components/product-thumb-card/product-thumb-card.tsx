import { Save, SquarePen } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { ProductsService, ProductTransformer } from '@zix/api';
import { useAuth } from '@zix/services/auth';
import { ZixButton } from '@zix/ui/common';
import { handleFormErrors, ZixInput, ZixSelectField } from '@zix/ui/forms';
import { CustomIcon } from '@zix/ui/icons';
import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import { useRouter } from 'solito/router';
import { Image, Text, Theme, XStack, YStack } from 'tamagui';

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
  const [productEdited, setProductEdited] = useState(false);
  const router = useRouter();
  const unitTypes = [
    { name: 'م', id: 'm' },
    { name: 'سم', id: 'cm' },
    { name: 'مم', id: 'mm' },
    { name: 'إنش', id: 'in' },
    { name: 'م²', id: 'm2' },
    { name: 'قدم²', id: 'ft2' },
    { name: 'م³', id: 'm3' },
    { name: 'لتر', id: 'ltr' },
    { name: 'مل', id: 'ml' },
    { name: 'طن', id: 'ton' },
    { name: 'كجم', id: 'kg' },
    { name: 'جم', id: 'g' },
    { name: 'م.ط', id: 'm4' },
  ];
  const [productPrice, setProductPrice] = useState(product.variant?.price);
  const [productUnit, setProductUnit] = useState(
    product.variant?.type_unit?.toString(),
  );
  const queryClient = useQueryClient();
  const toast = useToastController();
  const { user, getUrlPrefix } = useAuth();

  const { mutateAsync: updateProduct } = useMutation({
    mutationFn: (requestBody: any) => {
      if (product.id) {
        return ProductsService.updateProduct({
          product: product.id as string,
          requestBody,
        });
      }
    },
    onSuccess() {
      toast.show('تم تحديث المنتج بنجاح');
      setProductEdited(false);

      queryClient.invalidateQueries({
        queryKey: ['ProductsService.fetchAllProduct', user?.active_company?.id],
      });
    },
    onError(error: any) {
      alert(error.message);
      toast.show('حدث خطأ ما', {
        message: error.message,
      });
      handleFormErrors(form, error);
    },
  });

  const { mutateAsync: publishProduct } = useMutation({
    mutationFn: (requestBody: any) => {
      if (product.id) {
        return ProductsService.publishProduct({
          product: product.id as string,
          requestBody,
        });
      }
    },
    onSuccess() {
      toast.show('تم تحديث المنتج بنجاح');
      setProductEdited(false);

      queryClient.invalidateQueries({
        queryKey: ['ProductsService.fetchAllProduct', user?.active_company?.id],
      });
    },
    onError(error: any) {
      alert(error.message);
      toast.show('حدث خطأ ما', {
        message: error.message,
      });
      handleFormErrors(form, error);
    },
  });

  return (
    <YStack
      flex={1}
      backgroundColor="$color2"
      borderRadius={'$4'}
      key={index}
      padding={'$3'}
      gap="$4"
      marginVertical={'$2'}
      width={SCREEN_WIDTH - 40}
    >
      <XStack gap="$3" flex={1}>
        <XStack>
          {!!product?.image?.original_url ? (
            <Image
              source={{
                uri: product?.image?.original_url,
              }}
              width="$7"
              height="$8"
              borderRadius="$4"
            />
          ) : (
            <CustomIcon
              name="image-blank"
              width="$7"
              height="$8"
              color="$color2"
            />
          )}
        </XStack>

        <YStack
          flex={1}
          gap="$3"
          justifyContent="flex-start"
          alignItems="flex-start"
        >
          <XStack flex={1} alignItems="center" justifyContent="space-between">
            <Text
              fontWeight={'bold'}
              fontSize={'$2'}
              numberOfLines={2}
              flex={1}
              textAlign="left"
            >
              {product?.name || ''}
            </Text>

            <ZixButton
              size="$3"
              height="$3"
              backgroundColor="$color0"
              onPress={() =>
                router.push(`${getUrlPrefix}/products/${product.id}/edit`)
              }
              color="$color2"
              icon={SquarePen}
            />
          </XStack>

          <XStack flex={1} justifyContent="space-between" alignItems="center">
            <XStack gap="$2" alignItems="center" flex={1}>
              <ZixSelectField
                selectTriggerProps={{
                  size: '$3',
                  height: '$3',
                  flex: undefined,
                  width: 80,
                  padding: 5,
                }}
                selectTriggerTextProps={{
                  fontSize: 12,
                }}
                size="$3"
                options={unitTypes}
                value={productUnit}
                onChange={(value) => {
                  setProductEdited(true);
                  setProductUnit(value as string);
                }}
              />
              <ZixInput
                size="$3"
                height="$3"
                minWidth={100}
                flex={undefined}
                value={productPrice?.toString() || ''}
                onChangeText={(value) => {
                  setProductEdited(true);
                  setProductPrice(Number(value));
                }}
                leftIcon={() => (
                  <Theme name="accent">
                    <CustomIcon name="riyal" size="$1" color="$color0" />
                  </Theme>
                )}
              />
            </XStack>
            {productEdited && (
              <Theme name="accent">
                <ZixButton
                  size="$3"
                  height="$3"
                  backgroundColor="$color0"
                  onPress={() => {
                    updateProduct({
                      ...product,
                      variant: {
                        ...product.variant,
                        price: productPrice,
                        type_unit: productUnit,
                      },
                    });
                  }}
                  color="$color2"
                  icon={Save}
                />
              </Theme>
            )}
          </XStack>
        </YStack>
      </XStack>
      {!product?.is_published && (
        <Theme name="accent">
          <ZixButton
            width={'100%'}
            backgroundColor="$color1"
            height={35}
            borderRadius={'$4'}
            justifyContent="center"
            alignItems="center"
            fontSize={'$1'}
            fontWeight={'bold'}
            color="$color2"
            onPress={() => {
              publishProduct({
                ...product,
                is_published: 1,
              });
            }}
          >
            نشر
          </ZixButton>
        </Theme>
      )}
    </YStack>
  );
};

export default ProductThumbCard;
