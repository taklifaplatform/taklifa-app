import { CustomIcon } from "@zix/ui/icons";
import { ZixMediasListWidget } from "@zix/ui/widgets";
import {  Dimensions, RefreshControl,  } from "react-native";
import { ScrollView,  Button, Separator, Theme, YStack, Image, Text, XStack, View, Paragraph } from "tamagui";
import { ManageCountProduct, TitleInfo } from "@zix/ui/common";
import { Building2, ClockFading, Star } from "@tamagui/lucide-icons";
import moment from "moment";
import { useState } from "react";
import { ProductTransformer } from "@zix/api";

export const ProductDetailComponent = ({
  product,
  isLoading,
  refetch,
}: {
  product?: ProductTransformer | null;
  isLoading: boolean;
  refetch: () => void;
}) => {
  const SCREEN_WIDTH = Dimensions.get('window').width;
  const [count, setCount] = useState(1);

  const renderLocationInfo = () => (
    <TitleInfo
      icon={<Building2 size={20} color="$color0" />}
      title={product?.company?.name}
    />
  );

  const renderRatingsInfo = () => product?.rating_stats?.score && (
    <TitleInfo
      icon={<Star size={20} color="$color0" />}
      title={`${product?.rating_stats?.score} (${product?.rating_stats?.count} تقييمات)`}
    />
  );
  const renderTimeInfo = () => (
    <TitleInfo
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
        {product?.data?.variant?.price}
      </Text>
      <Theme name="accent">
        <CustomIcon name="riyal" size="$1" color="$color0" />
      </Theme>
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
      <Button
        theme={'accent'}
        flex={1}
        height={35}
        borderRadius={10}
        backgroundColor="$color1"
        justifyContent="center"
        alignItems="center"
        onPress={() => {}}
      >
        <Text fontSize={12} fontWeight={'bold'} color="#FFFFFF">
          أضف لعرض سعر
        </Text>
      </Button>
    </XStack>
  );
  return (
    <ScrollView
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
        {product?.image?.original_url ? (
          <Image
            source={{ uri: product?.image?.original_url }}
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
          medias={product?.images || []}
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
          {renderAddToCartInfo()}
        </YStack>

        {renderDescriptionInfo()}
        <Separator width="100%" />
        {/* {renderCarouselInfo()} */}
      </YStack>
    </ScrollView>
  );
};