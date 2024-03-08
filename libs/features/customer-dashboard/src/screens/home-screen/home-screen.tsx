import { useQuery } from '@tanstack/react-query';
import { DriverTransformer, DriversService } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { MapDriverMarker } from '@zix/ui/sawaeed';
import { useState } from 'react';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Carousel from 'react-native-reanimated-carousel';
import { Button, YStack } from 'tamagui';
import { DriverCard } from '../../components/DriverCard';

/* eslint-disable-next-line */
export interface HomeScreenProps { }


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

export function HomeScreen(props: HomeScreenProps) {
  const { width } = Dimensions.get('window');
  const [showMap, setShowMap] = useState(true);

  const { data, ...driversQuery } = useQuery({
    queryFn() {
      return DriversService.fetchAllDrivers({
        perPage: 50
      })
    },
    queryKey: ['DriversService.fetchAllDrivers']
  })

  // new props
  const [showCarousel, setShowCarousel] = useState(false)

  const renderMap = () => showMap && (
    <MapView
      style={{ flex: 1 }}
      initialCamera={initialCamera}
    >
      {
        data?.data?.map((driver, index) => (
          <MapDriverMarker
            key={`marker-${index}`}
            driver={driver}
            onPress={() => {
              setShowCarousel(true)
            }}
          />
        ))
      }
    </MapView>
  );
  //List
  const renderList = () => !showMap && (
    <FlatList
      refreshing={driversQuery.isFetching}
      onRefresh={driversQuery.refetch}
      style={{ flex: 1 }}
      data={data?.data || []}
      renderItem={({ item, index }) => (
        <DriverCard key={`stack-${item.id}-${index}`} driver={item} />
      )}
    />
  );

  //switch button Map / List
  const renderSwitcher = () => !showCarousel && (
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
      <DriverCard
        key={`view-${item.id}-${index}`}
        driver={item}
        onClose={() => setShowCarousel(false)}
        onPress={() => setShowCarousel(true)}
      />
    );
  };

  const renderCarousel = () => showCarousel && (
    <YStack backgroundColor={'$color1'}
      borderTopRightRadius={'$6'}
      borderTopLeftRadius={'$6'}
      paddingBottom="$4"
    >
      <Carousel
        width={width}
        height={width / 1.5}
        data={data?.data || []}
        renderItem={renderCarouselItem}
      />
    </YStack>
  );

  return (
    <YStack flex={1}>
      {renderMap()}
      {renderList()}
      {renderCarousel()}
      {renderSwitcher()}
    </YStack>
  )
}

export default HomeScreen;
