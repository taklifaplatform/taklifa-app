import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { Dimensions } from 'react-native';

import {
  ArrowLeft,
  ArrowRight,
  ClockFading,
  MapPin,
  Minus,
  Plus,
  Star,
} from '@tamagui/lucide-icons';
import { useMixpanel } from '@zix/services/auth';
import { TitleInfo } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useRef } from 'react';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import {
  Button,
  Image,
  Paragraph,
  ScrollView,
  Separator,
  Text,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { ProductCard } from '../../components';
import { createParam } from 'solito';
import { useQuery } from '@tanstack/react-query';
import { ProductsService } from '@zix/api';
import { RefreshControl } from 'react-native';
import moment from 'moment';
import { ZixMediasListWidget } from '@zix/ui/widgets';

const { useParams } = createParam<{ product?: string }>();
const { width: SCREEN_WIDTH } = Dimensions.get('window');

export function ProductScreen() {
  useMixpanel('Company Profile Screen view');
  const { params } = useParams();

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

  const handleUpdateCart = (value: number, state: 'plus' | 'minus') => {
    console.log(value, state);
  };

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
      {/* <ZixMediasListWidget
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
      /> */}
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
      <XStack
        width={'50%'}
        justifyContent="space-between"
        alignItems="center"
        borderWidth={1}
        borderColor="$color0"
        borderRadius={10}
        padding={'$2'}
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
        {product?.data?.image?.original_url && (
          <Image
            source={{ uri: product?.data?.image?.original_url }}
            width={Dimensions.get('window').width - 40}
            height={280}
            borderRadius={10}
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
