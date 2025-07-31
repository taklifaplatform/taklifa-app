import { CustomIcon } from '@zix/ui/icons';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import { Dimensions, RefreshControl } from 'react-native';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

import {
  ScrollView,
  Button,
  Separator,
  Theme,
  YStack,
  Image,
  Text,
  XStack,
  View,
  Paragraph,
} from 'tamagui';
import {
  AddToCartButton,
  ManageCountProduct,
  TextInfo,
  UserAvatar,
  ZixButton,
} from '@zix/ui/common';
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  Building2,
  ClockFading,
  Star,
} from '@tamagui/lucide-icons';
import moment from 'moment';
import { useState } from 'react';
import { ProductTransformer } from '@zix/api';
import { useTypeUnitArabic } from '@zix/utils';

export const ProductDetailComponent = ({
  product,
  onNextProduct,
  onPreviousProduct,
}: {
  product?: ProductTransformer | null;
  onNextProduct: () => void;
  onPreviousProduct: () => void;
}) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const [count, setCount] = useState(1);

  const renderLocationInfo = () => (
    <TextInfo
      icon={<Building2 size={20} color="$color0" />}
      title={product?.company?.name}
    />
  );

  const renderRatingsInfo = () =>
    product?.rating_stats?.score && (
      <TextInfo
        icon={<Star size={20} color="$color0" />}
        title={`${product?.rating_stats?.score} (${product?.rating_stats?.count} تقييمات)`}
      />
    );
  const renderTimeInfo = () => (
    <TextInfo
      icon={<ClockFading size={20} color="$color0" />}
      title={moment(product?.created_at).fromNow()}
    />
  );

  const renderDescriptionInfo = () => (
    <YStack gap="$4" justifyContent="flex-start" alignItems="flex-start">
      <Text fontSize={'$4'} fontWeight={'bold'} color="$color11">
        الوصف
      </Text>
      <Paragraph
        color="$color11"
        fontSize="$1"
        fontWeight="600"
        lineHeight={'$6'}
        textAlign="left"
      >
        {product?.description}
      </Paragraph>
    </YStack>
  );

  const renderPriceInfo = () => (
    <XStack width="100%" gap="$2" alignItems="center" paddingVertical={'$2'}>
      <Text fontSize={'$5'} fontWeight={'bold'} color="$color11">
        {product?.variant?.price}
      </Text>
      <Theme name="accent">
        <CustomIcon name="riyal" size="$1" color="$color0" />
      </Theme>
    </XStack>
  );
  const renderTypeUnitInfo = () => (
    <XStack width="100%" gap="$2" alignItems="center" paddingVertical={'$2'}>
      <Text fontSize={'$5'} fontWeight={'bold'} color="$color11">
        {useTypeUnitArabic({ type_unit: product?.variant?.type_unit || '' })}
      </Text>
    </XStack>
  );
  const renderAddToCartInfo = () => (
    <XStack width="100%" gap="$3">
      <ManageCountProduct
        value={count}
        onUpdate={(value) => {
          setCount(value);
        }}
        width={'50%'}
        height={35}
        size={15}
        max={product?.variant?.stock}
      />
      <AddToCartButton width={'45%'} height={35} product={product} />
    </XStack>
  );

  const renderCompanyInfo = () => (
    <XStack theme="accent" width="100%" gap={'$3'} alignItems="center">
      <UserAvatar user={{ logo: product?.company?.logo }} size={'$3'} />
      <YStack flex={1} gap={'$2'}>
        <XStack flex={1} gap={'$2'}>
          <Text fontWeight={'bold'} fontSize={'$4'} color="$color1">
            {product?.company?.name}
          </Text>
          <BadgeCheck size={20} color={'green'} />
        </XStack>
        <TextInfo
          icon={<Building2 size={16} color={'black'} />}
          title={
            product?.company?.location?.address +
            ' ' +
            product?.company?.location?.country?.name
          }
          fontSize={'$2'}
        />
      </YStack>
    </XStack>
  );
  //
  return (
    <BottomSheetModalProvider>
      <ScrollView>
        <YStack
          flex={1}
          backgroundColor="$color1"
          borderRadius="$5"
          gap="$4"
          justifyContent="center"
          alignItems="flex-start"
          padding="$4"
        >
          {product?.image?.original_url ? (
            <Image
              source={{ uri: product?.image?.original_url }}
              width={SCREEN_WIDTH - 40}
              height={230}
              borderRadius={10}
            />
          ) : (
            <Theme reset>
              <View
                width={SCREEN_WIDTH - 40}
                height={230}
                backgroundColor="$color2"
                borderRadius={10}
                borderWidth={1}
                borderColor="$color8"
                overflow="hidden"
                alignItems="center"
                justifyContent="center"
              >
                <CustomIcon name="image-blank" size={200} color="$color2" />
              </View>
            </Theme>
          )}
          {product?.images && (
            <ZixMediasListWidget
              position="relative"
              medias={product?.images || []}
              height={100}
              imageWidth={100}
              imageHeight={100}
            />
          )}
          <YStack
            width="100%"
            gap="$2"
            alignItems="flex-start"
            justifyContent="flex-start"
            backgroundColor="$color2"
            padding="$4"
            borderRadius="$5"
          >
            <Text fontWeight="bold" fontSize="$4">
              {product?.name}
            </Text>
            <YStack gap="$2">
              {renderLocationInfo()}
              <XStack gap="$2">
                {renderTimeInfo()}
                {renderRatingsInfo()}
              </XStack>
            </YStack>
            {renderPriceInfo()}
            {renderTypeUnitInfo()}
            {renderAddToCartInfo()}
          </YStack>

          {renderDescriptionInfo()}
          <Separator width="100%" />
          {renderCompanyInfo()}
          <Separator width="100%" />
          <XStack gap="$2" justifyContent="space-between" width="100%">
            <ZixButton
              backgroundColor="$color1"
              icon={<ArrowRight size={20} color="$color0" />}
              onPress={() => onNextProduct()}
            />
            <ZixButton
              backgroundColor="$color1"
              icon={<ArrowLeft size={20} color="$color0" />}
              onPress={() => onPreviousProduct()}
            />
          </XStack>
        </YStack>
      </ScrollView>
    </BottomSheetModalProvider>
  );
};
