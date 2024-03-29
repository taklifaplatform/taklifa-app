import { X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { CompaniesService, DriverTransformer, DriversService } from '@zix/api';
import { UserCard } from '@zix/features/users';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader } from '@zix/ui/layouts';
import { MapCompanyMarker, MapDriverMarker } from '@zix/ui/sawaeed';
import { getDistance } from '@zix/utils';
import { useMemo, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
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
  const { width } = Dimensions.get('window');
  const USER_CARD_WIDTH = width;
  const USER_CARD_HEIGHT = Math.min(250, width / 1.5);
  const mapRef = useRef<MapView>(null);
  const carouselRef = useRef<ICarouselInstance>(null);

  const [showMap, setShowMap] = useState(true);

  const [search, setSearch] = useState<string>();
  const { data, ...driversQuery } = useQuery({
    queryFn() {
      return DriversService.fetchAllDrivers({
        perPage: 50,
        search,
      });
    },
    queryKey: ['DriversService.fetchAllDrivers', search],
  });
  const companiesQuery = useQuery({
    queryFn() {
      return CompaniesService.fetchAllCompanies({
        perPage: 50,
        search,
      });
    },
    queryKey: ['CompaniesService.fetchAllCompanies', search],
  });
  const [selectedDriver, setSelectedDriver] = useState<DriverTransformer>();

  const driversList = useMemo<DriverTransformer[]>(() => {
    if (!selectedDriver?.location || !data?.data) {
      return data?.data || [];
    }
    return data.data.sort((a, b) => {
      if (!a.location || !b.location) return 0;
      const aDistance = getDistance(selectedDriver.location, a.location);
      const bDistance = getDistance(selectedDriver.location, b.location);
      return aDistance - bDistance;
    });
  }, [data?.data, selectedDriver]);

  const [showCarousel, setShowCarousel] = useState(false);

  // on, Swipe item MAP Animation
  function onAnimateToDriver(driver: DriverTransformer) {
    if (!driver.location) return;

    if (!showCarousel) {
      setShowCarousel(true);
    }

    if (mapRef && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: Number(driver.location.latitude),
            longitude: Number(driver.location.longitude),
          },
          zoom: 16,
        },
        { duration: 1000 },
      );
    }
  }

  function onCloseCarouselButtonPress() {
    setShowCarousel(false);
    setSelectedDriver(undefined);
    if (mapRef && mapRef.current) {
      mapRef.current.animateCamera(
        {
          zoom: 6,
        },
        { duration: 1000 },
      );
    }
  }

  // Carousel SnapItem
  function onSnapToItem(index: number) {
    onAnimateToDriver(driversList[index]);
    setSelectedDriver(driversList[index]);
  }

  function onMarkerPress(driver: DriverTransformer, index: number) {
    setSelectedDriver(driver);
    onAnimateToDriver(driver);
    setShowCarousel(true);
    carouselRef?.current?.scrollTo({
      index,
      animated: true,
    });
  }

  const renderMapDrivers = () => driversList.map((driver, index) => (
    <MapDriverMarker
      key={`marker-${index}`}
      driver={driver}
      isSelected={selectedDriver?.id === driver.id}
      onPress={() => {
        onMarkerPress(driver, index);
      }}
    />
  ))

  const renderMapCompanies = () => companiesQuery.data?.data?.map((company, index) => (
    <MapCompanyMarker
      key={`marker-${index}`}
      company={company}
    // isSelected={selectedDriver?.id === driver.id}
    // onPress={() => {
    //   onMarkerPress(driver, index);
    // }}
    />
  ))

  const renderMap = () =>
    showMap && (
      <MapView ref={mapRef} style={{ flex: 1 }} initialCamera={initialCamera}>
        {renderMapDrivers()}
        {renderMapCompanies()}
      </MapView>
    );
  //List
  const renderList = () =>
    !showMap && (
      <FlatList
        refreshing={driversQuery.isFetching}
        onRefresh={driversQuery.refetch}
        style={{ flex: 1 }}
        data={driversList}
        renderItem={({ item, index }) => (
          <UserCard
            key={`stack-${item.id}-${index}`}
            user={item}
            marginHorizontal="$4"
            marginVertical="$2"
          // backgroundColor='$color2'
          />
        )}
      />
    );

  //switch button Map / List
  const renderSwitcher = () =>
    !showCarousel && (
      <Button
        theme="accent"
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
        marginHorizontal="$4"
        backgroundColor="$color2"
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
          backgroundColor="$color1"
          size="$3"
          width="$6"
          position="absolute"
          top="$-6"
          left="$4"
          onPress={onCloseCarouselButtonPress}
        />
        <Carousel
          ref={carouselRef}
          width={USER_CARD_WIDTH}
          height={USER_CARD_HEIGHT}
          data={data?.data || []}
          renderItem={renderCarouselItem}
          onSnapToItem={onSnapToItem}
        />
      </YStack>
    );

  return (
    <YStack flex={1}>
      <AppHeader
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: setSearch,
        }}
      />
      {renderMap()}
      {renderList()}
      {renderCarousel()}
      {renderSwitcher()}
    </YStack>
  );
}

export default HomeScreen;
