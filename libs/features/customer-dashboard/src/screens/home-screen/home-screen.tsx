import { X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { DriverTransformer, DriversService } from '@zix/api';
import { UserCard } from '@zix/features/users';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader } from '@zix/ui/layouts';
import { MapDriverMarker } from '@zix/ui/sawaeed';
import { useAuth } from '@zix/utils';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Carousel from 'react-native-reanimated-carousel';
import { Button, YStack } from 'tamagui';


const initialCamera = {
  center: {
    latitude: 24.713552,
    longitude: 46.675296,
  },
  pitch: 0,
  heading: 0,
  altitude: 100000,
  zoom: 20,
};

export function HomeScreen() {
  const { user } = useAuth()

  const { width } = Dimensions.get('window');
  const USER_CARD_WIDTH = width;
  // const USER_CARD_HEIGHT = 210;
  const USER_CARD_HEIGHT = width / 1.5;

  const [showMap, setShowMap] = useState(true);

  const { data, ...driversQuery } = useQuery({
    queryFn() {
      return DriversService.fetchAllDrivers({
        perPage: 50,
      });
    },
    queryKey: ['DriversService.fetchAllDrivers'],
  });

  // new props
  const [showCarousel, setShowCarousel] = useState(false);

  const renderMap = () =>
    showMap && (
      <MapView style={{ flex: 1 }} initialCamera={initialCamera}>
        {data?.data?.map((driver, index) => (
          <MapDriverMarker
            key={`marker-${index}`}
            driver={driver}
            onPress={() => {
              setShowCarousel(true);
            }}
          />
        ))}
      </MapView>
    );
  //List
  const renderList = () =>
    !showMap && (
      <FlatList
        refreshing={driversQuery.isFetching}
        onRefresh={driversQuery.refetch}
        style={{ flex: 1 }}
        data={data?.data || []}
        renderItem={({ item, index }) => (
          <UserCard
            key={`stack-${item.id}-${index}`}
            user={item}
            marginHorizontal='$4'
            marginVertical='$2'
          />
        )}
      />
    );

  //switch button Map / List
  const renderSwitcher = () =>
    !showCarousel && (
      <Button
        position="absolute"
        bottom="$4"
        left="$4"
        icon={<CustomIcon name={showMap ? 'list' : 'map'} size="$2" />}
        fontWeight="600"
        fontSize="$2"
        size="$3"
        onPress={() => setShowMap(!showMap)}
      >
        {showMap ? 'القائمة' : 'الخريطة'}
      </Button>
    );

  const renderCarouselItem = ({
    item,
    index,
  }: {
    index: number;
    item: DriverTransformer;
  }) => {
    return (
      <UserCard
        key={`view-${item.id}-${index}`}
        user={item}
        height={USER_CARD_HEIGHT}
        marginHorizontal='$4'
      />
    );
  };

  const renderCarousel = () =>
    showCarousel && (
      <YStack
        backgroundColor={'$color1'}
        borderTopRightRadius={'$6'}
        borderTopLeftRadius={'$6'}
        paddingVertical="$5"
      >
        <Button
          icon={X}
          scaleIcon={1.5}
          backgroundColor='$gray1'
          size='$3'
          width='$6'
          position='absolute'
          top='$-6'
          left='$4'
          onPress={() => setShowCarousel(false)}
        />
        <Carousel
          width={USER_CARD_WIDTH}
          height={USER_CARD_HEIGHT}
          data={data?.data || []}
          renderItem={renderCarouselItem}
        />
      </YStack>
    );

  return (
    <YStack flex={1}>
      <AppHeader showSearchBar />
      {renderMap()}
      {renderList()}
      {renderCarousel()}
      {renderSwitcher()}
    </YStack>
  );
}

export default HomeScreen;
