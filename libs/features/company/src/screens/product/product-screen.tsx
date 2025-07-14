import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { Dimensions } from 'react-native';

import {
  ArrowLeft,
  ArrowRight,
  ClockFading,
  MapPin,
  Star,
} from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { ProductsService } from '@zix/api';
import { useMixpanel } from '@zix/services/auth';
import { ManageCountProduct, ProductCard, TitleInfo } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { ZixMediasListWidget } from '@zix/ui/widgets';
import moment from 'moment';
import { useRef, useState } from 'react';
import { RefreshControl } from 'react-native';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { createParam } from 'solito';
import {
  Button,
  Image,
  Paragraph,
  ScrollView,
  Separator,
  Text,
  Theme,
  View,
  XStack,
  YStack,
} from 'tamagui';

const { useParams } = createParam<{ product?: string }>();
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function ProductScreen() {
  useMixpanel('Company Profile Screen view');
  const { params } = useParams();
  const [count, setCount] = useState(1);
  const {
    data: product,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ['product', params?.product],
    queryFn: () =>
      ProductsService.retrieveProduct({
        product: params?.product,
      }),
  });

  const { data: products } = useQuery({
    queryKey: ['company', product?.data?.company?.id],
    queryFn: () =>
      ProductsService.fetchAllProduct({
        companyId: product?.data?.company?.id,
      }),
  });

  console.log('product', JSON.stringify(product, null, 2));

  const renderLocationInfo = () => (
    <TitleInfo
      icon={<MapPin size={20} color="$color0" />}
      title={product?.data?.company?.name}
    />
  );

  const renderRatingsInfo = () => (
    <TitleInfo
      icon={<Star size={20} color="$color0" />}
      title="7,4 (350 تقييمات)"
    />
  );
  const renderTimeInfo = () => (
    <TitleInfo
      icon={<ClockFading size={20} color="$color0" />}
      title={moment(product?.data?.created_at).fromNow()}
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
        {product?.data?.description}
      </Paragraph>
    </YStack>
  );

  const baseOptions = {
    width: SCREEN_WIDTH - 40,
    height: 330,
    scrollAnimationDuration: 3000,
  };
  const carouselRef = useRef<ICarouselInstance>(null);
  const renderCarouselInfo = () => (
    <YStack width="100%" gap="$6" marginTop={'$4'} marginBottom={'$4'}>
      <XStack
        width="100%"
        gap="$2"
        justifyContent="space-between"
        alignItems="center"
      >
        <Text fontSize={'$2'} fontWeight={'bold'} color="$color11">
          أعلى مبيعًا
        </Text>
        <XStack gap="$2">
          <Button
            icon={<ArrowRight size={20} color="$color11" />}
            unstyled
            onPress={() => carouselRef.current?.scrollTo({ count: 1 })}
          />
          <Button
            icon={<ArrowLeft size={20} color="$color11" />}
            unstyled
            onPress={() => carouselRef.current?.scrollTo({ count: -1 })}
          />
        </XStack>
      </XStack>
      <Carousel
        {...baseOptions}
        key={1}
        ref={carouselRef}
        autoPlay={false}
        maxScrollDistancePerSwipe={10}
        scrollAnimationDuration={3000}
        data={products?.data || []}
        renderItem={({ item, index }) => (
          <XStack flex={1} justifyContent="center" alignItems="center" gap="$3">
            <ProductCard product={item} index={index} useShowButton={false} />
            {products?.data[index + 1] ? (
              <ProductCard
                product={products?.data[index + 1]}
                index={index + 1}
                useShowButton={false}
              />
            ) : (
              <View width={SCREEN_WIDTH / 2.4} />
            )}
          </XStack>
        )}
      />
    </YStack>
  );

  const renderPriceInfo = () => (
    <XStack width="100%" gap="$2" alignItems="center" paddingVertical={'$2'}>
      <Text fontSize={'$5'} fontWeight={'bold'} color="$color11">
        3.500
      </Text>
      <CustomIcon name="riyal" size="$1" />
    </XStack>
  );
  const renderAddToCartInfo = () => (
    <XStack width="100%" gap="$3">
      <ManageCountProduct
        value={count}
        onUpdate={setCount}
        width={'50%'}
        height={30}
        size={10}
      />
      <Button
        theme={'accent'}
        width={'40%'}
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
    </XStack>
  );

  const renderProductProfile = () => (
    <ScrollView
      flex={1}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      }
    >
      <YStack
        flex={1}
        backgroundColor="$color1"
        borderRadius="$5"
        gap="$4"
        justifyContent="center"
        alignItems="flex-start"
        padding="$4"
      >
        {product?.data?.image?.original_url ? (
          <Image
            source={{ uri: product?.data?.image?.original_url }}
            width={SCREEN_WIDTH - 40}
            height={280}
            borderRadius={10}
          />
        ) : (
          <Theme reset>
            <View
              width={SCREEN_WIDTH - 40}
              height={280}
              backgroundColor="$color2"
              borderRadius={10}
              borderWidth={1}
              borderColor="$color8"
              overflow="hidden"
              alignItems="center"
              justifyContent="center"
            >
              <CustomIcon name="image-blank" size={240} color="$color2" />
            </View>
          </Theme>
        )}
        <ZixMediasListWidget
          position="relative"
          height={100}
          imageWidth={100}
          imageHeight={100}
          medias={[
            {
              original_url:
                'https://cdn-icons-png.flaticon.com/512/616/615495.png',
            },
            {
              original_url:
                'https://cdn-icons-png.flaticon.com/512/616/619495.png',
            },
            {
              original_url:
                'https://cdn-icons-png.flaticon.com/512/616/616425.png',
            },
            {
              original_url:
                'https://cdn-icons-png.flaticon.com/512/616/616495.png',
            },
          ]}
        />
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
            {product?.data?.name}
          </Text>
          <YStack gap="$2">
            {renderLocationInfo()}
            <XStack gap="$2">
              {renderTimeInfo()}
              {renderRatingsInfo()}
            </XStack>
          </YStack>
          {renderPriceInfo()}
          {renderAddToCartInfo()}
        </YStack>

        {renderDescriptionInfo()}
        <Separator width="100%" />
        {renderCarouselInfo()}
      </YStack>
    </ScrollView>
  );

  const renderHeader = () => (
    <AppHeader
      showBackButton
      showCardHeader
      cardHeaderValue={'3.500'}
      title=""
    />
  );

  return (
    <ScreenLayout>
      {renderHeader()}
      {renderProductProfile()}
    </ScreenLayout>
  );
}

export default ProductScreen;
