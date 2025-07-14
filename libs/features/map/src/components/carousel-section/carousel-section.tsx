import { CompanyTransformer } from "@zix/api";
import { FC, memo } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";
import { Button, YStack } from "tamagui";

interface CarouselSectionProps {
    showCarousel: boolean;
    companiesList: CompanyTransformer[];
    USER_CARD_WIDTH: number;
    USER_CARD_HEIGHT: number;
    carouselRef: React.RefObject<ICarouselInstance>;
    safeDefaultIndex: number;
    renderCarouselItem: (props: {
      item: CompanyTransformer;
      index: number;
    }) => JSX.Element;
    onSnapToItem: (index: number) => void;
    onCloseCarouselButtonPress: () => void;
    X: any;
  }
  const CarouselSection: FC<CarouselSectionProps> = memo(
    function CarouselSection({
      showCarousel,
      companiesList,
      USER_CARD_WIDTH,
      USER_CARD_HEIGHT,
      carouselRef,
      safeDefaultIndex,
      renderCarouselItem,
      onSnapToItem,
      onCloseCarouselButtonPress,
      X,
    }) {
      if (!showCarousel || companiesList.length === 0) return null;
      return (
        <YStack
          position="absolute"
          bottom={0}
          backgroundColor={'$color1'}
          borderTopRightRadius={'$6'}
          borderTopLeftRadius={'$6'}
          paddingVertical="$5"
        >
          <Button
            icon={X}
            scaleIcon={1.5}
            backgroundColor="$color1"
            size="$3"
            width="$6"
            position="absolute"
            top="$-6"
            left="$4"
            onPress={onCloseCarouselButtonPress}
          />
          <Carousel
            key={companiesList.length}
            ref={carouselRef}
            width={USER_CARD_WIDTH}
            height={USER_CARD_HEIGHT}
            autoPlay={false}
            data={companiesList}
            defaultIndex={safeDefaultIndex}
            renderItem={renderCarouselItem}
            onSnapToItem={onSnapToItem}
          />
        </YStack>
      );
    },
  );

  export default CarouselSection;