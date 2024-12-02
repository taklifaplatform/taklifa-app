import { useIsFocused } from '@react-navigation/native';
import { ScanBarcode, X } from '@tamagui/lucide-icons';
import * as Location from 'expo-location';
import { useQuery } from '@tanstack/react-query';
import { CompaniesService, DriverTransformer, DriversService, LocationService } from '@zix/api';
import { UserCard } from '@zix/features/users';
import { USER_ROLES, useAuth } from '@zix/services/auth';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { MapCompanyMarker, MapDriverMarker } from '@zix/ui/sawaeed';
import { getDistance } from '@zix/utils';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Animated, Dimensions, Keyboard, Platform } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRouter } from 'solito/router';
import { Button, H4, View, YStack } from 'tamagui';
import MapFilters from '../../components/map-filters/map-filters';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

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

export function HomeScreen() {
  console.log("======================")
  console.log("HomeScreen->RENDER ::", Date.now())
  const USER_CARD_WIDTH = width;
  const USER_CARD_HEIGHT = Math.max(260, height / 4);

  const mapRef = useRef<MapView>(null);
  const carouselRef = useRef<ICarouselInstance>(null);
  const router = useRouter();
  const { getUrlPrefix, user } = useAuth();

  const [filters, setFilters] = useState({
    vehicle_model: 'all',
    provider_type: 'all',
  })
  const [showMap, setShowMap] = useState(true);
  const [search, setSearch] = useState<string>();
  const filtersKey = useMemo(() => Object.values(filters).join('-'), [filters]);
  const { data, ...driversQuery } = useQuery({
    queryFn() {
      return DriversService.fetchAllDrivers({
        perPage: Platform.select({ web: 80, ios: 50, android: 20 }),
        vehicleModel: filters.vehicle_model,
        search,
      });
    },
    queryKey: ['DriversService.fetchAllDrivers', search, filtersKey],
    // staleTime: 5 * 1000,
  });
  const companiesQuery = useQuery({
    queryFn() {
      return CompaniesService.fetchAllCompanies({
        perPage: Platform.select({ web: 80, ios: 50, android: 20 }),
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
      const aDistance = getDistance(selectedDriver?.location, a.location);
      const bDistance = getDistance(selectedDriver?.location, b.location);
      return aDistance < bDistance ? a : b;
    });
  }, [data?.data, selectedDriver]);

  // TODO:: Get user location when role is driver

  const [driverLocation, setDriverLocation] = useState(null)
  const getDriverLocation = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== 'granted') {
      console.log('Permission to access location was denied');
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    setDriverLocation(location?.coords);
    LocationService.updateLiveLocation({
      requestBody: {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude
      }
    })
  }

  const updateLocationInterval = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setDriverLocation(null)
    if (
      ![USER_ROLES.solo_driver, USER_ROLES.company_driver].includes(user.active_role?.name as any)) {
      return;
    }
    if (driverLocation?.latitude) {
      updateLocationInterval.current = setInterval(() => {
        getDriverLocation();
      }, 1000 * 60 * 5);
    }
    getDriverLocation();
    return () => {
      if (updateLocationInterval.current) {
        clearInterval(updateLocationInterval.current);
      }
    }
  }, [user]);


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

  // Keyboard Detect
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => setKeyboardVisible(true)
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => setKeyboardVisible(false)
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    } else {
      setKeyboardVisible(false);
    }

  }, [isFocused]);

  // Full-screen animation state
  const [isMapFullScreen, setIsMapFullScreen] = useState(false);
  const animationValue = useRef(new Animated.Value(1)).current;

  const animateOut = () => {
    setIsMapFullScreen(true);
    Animated.timing(animationValue, {
      toValue: 0, // Fully transparent
      duration: 1,
      useNativeDriver: true,
    }).start();
  };

  const animateIn = () => {
    Animated.timing(animationValue, {
      toValue: 1, // Fully visible
      duration: 1,
      useNativeDriver: true,
    }).start(() => setIsMapFullScreen(false));
  };

  const renderMapDrivers = () =>
    (filters.provider_type === 'all' || filters.provider_type === USER_ROLES.solo_driver) ?
      driversList.map((driver, index) => (
        <MapDriverMarker
          key={`marker-${index}`}
          driver={driver}
          isSelected={selectedDriver?.id === driver.id}
          onPress={() => {
            onMarkerPress(driver, index);
          }}
        />
      )) : null;

  const renderMapCompanies = () =>
    (filters.provider_type === 'all' || filters.provider_type === 'company') ?
      companiesQuery.data?.data?.map((company, index) => (
        <MapCompanyMarker
          key={`marker-${index}`}
          company={company}
          onPress={() => {
            router.push(`${getUrlPrefix}/companies/${company.id}`);
          }}
        />
      )) : null;

  const renderMap = () =>
    showMap && (
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialCamera={initialCamera}
        onPress={() => Keyboard.dismiss()}
        showsUserLocation={!!driverLocation}
        showsMyLocationButton={false}
        onTouchStart={() => {
          if (!isMapFullScreen) animateOut();
        }
        }
        onTouchEnd={() => {
          if (isMapFullScreen) animateIn();
        }
        }
      >
        {renderMapDrivers()}
        {renderMapCompanies()}
      </MapView>
    );
  //List
  const renderList = () =>
    !showMap && (
      <View flex={1}
        marginTop={isKeyboardVisible ? 0 : "$10"}
      >
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
              flex={1}
              marginHorizontal="$4"
              marginVertical="$2"
              backgroundColor="$color2"
            />
          )}
          ListEmptyComponent={
            <View flex={1} alignItems='center' gap="$8">
              <CustomIcon name="empty_data" size="$18" color="$color5" />
              <H4>No Data Found!</H4>
            </View>
          }
        />
      </View>
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

  // center user location
  const renderCenterButton = () => driverLocation?.latitude && (
    <Button
      theme="accent"
      icon={<MaterialIcons name="my-location" size={20} color="black" />}
      circular
      position="absolute"
      bottom="$3"
      right="$4"
      onPress={() => {
        mapRef?.current?.animateCamera({
          center: {
            latitude: parseFloat(driverLocation?.latitude),
            longitude: parseFloat(driverLocation?.longitude),
          },
          zoom: 16,
        });
      }}
    />
  )

  const renderFilters = () => (
    <View position='absolute' top={1}>
      <MapFilters values={filters} onChange={setFilters} />
    </View>
  )

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
        flex={1}
        height={USER_CARD_HEIGHT}
        marginHorizontal="$4"
        backgroundColor="$color2"
      />
    );
  };

  const renderCarousel = () =>
    showCarousel && (
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
          key={driversList.length}
          ref={carouselRef}
          width={USER_CARD_WIDTH}
          height={USER_CARD_HEIGHT}
          autoPlay={false}
          data={driversList || []}
          defaultIndex={
            selectedDriver?.id
              ? driversList.findIndex((d) => d.id === selectedDriver.id)
              : 0
          }
          renderItem={renderCarouselItem}
          onSnapToItem={onSnapToItem}
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
        <YStack flex={1} position='relative'>
          {renderMap()}
          {!isMapFullScreen && renderList()}
          {!isMapFullScreen && !isKeyboardVisible && renderCarousel()}
          {!isMapFullScreen && !isKeyboardVisible && renderSwitcher()}
          {!isMapFullScreen && driverLocation && showMap && renderCenterButton()}
          {!isMapFullScreen && !isKeyboardVisible && renderFilters()}
        </YStack>
      </YStack>
    </ScreenLayout>
  );
}

export default HomeScreen;
