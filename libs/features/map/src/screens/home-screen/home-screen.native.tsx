import { ScanBarcode, X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { CompaniesService, DriverTransformer, DriversService } from '@zix/api';
import { UserCard } from '@zix/features/users';
import { useAuth } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { MapCompanyMarker, MapDriverMarker } from '@zix/ui/sawaeed';
import { getDistance } from '@zix/utils';
import React from 'react';
import { useMemo, useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRouter } from 'solito/router';
import { Button, YStack, View } from 'tamagui';

const initialCamera = {
  center: {
    latitude: 24.713552,
    longitude: 46.675296,
  },
  pitch: 0,
  heading: 0,
  altitude: 100000,
  zoom: 10,
};

export const HomeScreen = React.memo(
  () => {
    const { width } = Dimensions.get('window');
    const USER_CARD_WIDTH = width;
    const USER_CARD_HEIGHT = Math.min(250, width / 1.5);
    const mapRef = useRef<MapView>(null);
    const carouselRef = useRef<ICarouselInstance>(null);
    const router = useRouter();
    const { getUrlPrefix } = useAuth();

    const [showMap, setShowMap] = useState(true);
    console.log('***************************');
    console.log('render home screen ==========');
    console.log('***************************');
    const [search, setSearch] = useState<string>();
    const { data, ...driversQuery } = useQuery({
      queryFn() {
        return DriversService.fetchAllDrivers({
          perPage: 50,
          search,
        });
      },
      queryKey: ['DriversService.fetchAllDrivers', search],
      staleTime: 5 * 1000,
    });
    const companiesQuery = useQuery({
      queryFn() {
        return CompaniesService.fetchAllCompanies({
          perPage: 50,
          search,
        });
      },
      queryKey: ['CompaniesService.fetchAllCompanies', search],
      staleTime: 5 * 1000,
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
        //return aDistance - bDistance;
        return aDistance < bDistance ? a : b;
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
            zoom: 10,
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

    const renderMapDrivers = () =>
      driversList.map((driver, index) => (
        <MapDriverMarker
          key={`marker-${index}`}
          driver={driver}
          isSelected={selectedDriver?.id === driver.id}
          onPress={() => {
            onMarkerPress(driver, index);
          }}
        />
      ));

    const renderMapCompanies = () =>
      companiesQuery.data?.data?.map((company, index) => (
        <MapCompanyMarker
          key={`marker-${index}`}
          company={company}
          // isSelected={selectedDriver?.id === driver.id}
          onPress={() => {
            router.push(`${getUrlPrefix}/companies/${company.id}`);
          }}
        />
      ));

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
          initialNumToRender={5}
          maxToRenderPerBatch={5}
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
            key={driversList.length}
            ref={carouselRef}
            width={USER_CARD_WIDTH}
            height={USER_CARD_HEIGHT}
            autoPlay={false}
            //data={data?.data || []}
            data={driversList || []}
            renderItem={renderCarouselItem}
            onSnapToItem={onSnapToItem}
            onScrollBegin={() => {
              console.log('===1');
            }}
            onScrollEnd={() => {
              console.log('===2');
            }}
          />
        </YStack>
      );

    return (
      <ScreenLayout>
        <YStack flex={1}>
          <AppHeader
            showSearchBar
            searchProps={{
              value: search,
              onChangeText: setSearch,
              rightIcon: () => (showMap ? <ScanBarcode size="$1.5" /> : null),
            }}
          />
          {renderMap()}
          {renderList()}
          {renderCarousel()}
          {renderSwitcher()}
        </YStack>
      </ScreenLayout>
    );
  },
  () => true,
);

export default HomeScreen;
