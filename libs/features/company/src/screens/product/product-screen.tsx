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
  XStack,
  YStack,
} from 'tamagui';
import { ProductCard } from '../../components';

export function ProductScreen() {
  useMixpanel('Company Profile Screen view');

  const handleUpdateCart = (value: number, state: 'plus' | 'minus') => {
    console.log(value, state);
  };

  const renderLocationInfo = () => (
    <TitleInfo
      icon={<MapPin size={20} color="$color0" />}
      title="خدمات لياسة الجدران الخارجية"
   
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
      title="منذ ساعة"
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
        يتم عمل الاسلاك وتركيب الزوايا اولا ثم عمل طرطشة بالاسمنت وتركه ليجف
        وتتم معالجته برش الماء لمدة 3 ايام لزيادة التماسك ثم البدء باللياسة بعمل
        البوجات لضمان استقامة الحائط او السقف وبعد الانتهاء يتم رش اللياسة لمدة
        3 ايام. 
      </Paragraph>
    </YStack>
  );

  const baseOptions = {
    width: Dimensions.get('window').width - 40,
    height: 330,
    autoPlay: true,
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
        data={[
          {
            title: 'اعمال خرسانة الاساس ',
            description: 'خدمات لياسة الجدران الخارجية',
            price: {
              value: 3500,
            },
            images: [require('./pic.png')],
          },
          {
            title: 'مغسلة رخام',
            description: 'خدمات لياسة الجدران الخارجية',
            price: {
              value: 5500,
            },
            images: [require('./pic.png')],
          },
        ]}
        renderItem={({ item, index }) => (
          // <ProductCard product={item} index={index} useShowButton={false} />
          <XStack flex={1} justifyContent="center" alignItems="center" gap="$3">
            <ProductCard
              product={item}
              index={index + 1}
              useShowButton={false}
            />
            <ProductCard
              product={item}
              index={index + 2}
              useShowButton={false}
            />
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
      // refreshControl={
      //   <RefreshControl refreshing={isLoading} onRefresh={refetch} />
      // }
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
        <Image
          source={require('./pic.png')}
          width={Dimensions.get('window').width - 40}
          height={280}
          borderRadius={10}
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
            مغسلة رخام
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
  // const company = data?.data;

  // const renderLoadingSpinner = () =>
  //   !company?.id && !isError && <FullScreenSpinner />;

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
