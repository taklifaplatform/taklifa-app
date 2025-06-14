import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import { List, Map, X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { AnalyticsService, CompaniesService, CompanyTransformer, DriverTransformer, DriversService, LocationService, VehiclesService } from '@zix/api';
import { CompanyCard, UserCard } from '@zix/features/users';
import { USER_ROLES, useAuth, useMixpanel } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { MapCompanyMarker, MapDriverMarker } from '@zix/ui/sawaeed';
import { getDistance } from '@zix/utils';
import * as Location from 'expo-location';
import { t } from 'i18next';
import debounce from 'lodash/debounce';
import type { FC } from 'react';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { Dimensions, Keyboard, Platform, SectionList, Alert, Linking } from 'react-native';
import MapView, { Region, Circle } from 'react-native-maps';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRouter } from 'solito/router';
import { Button, H4, Spinner, View, XStack, YStack, Text } from 'tamagui';
import MapFilters from '../../components/map-filters/map-filters';
import Animated, { useSharedValue, useAnimatedStyle, withTiming, interpolateColor, Easing } from 'react-native-reanimated';
import { Pressable } from 'react-native';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const initialCamera = {
  center: {
    // latitude: 24.713552,
    // longitude: 46.675296,
    "latitude": 24.66962499163617,
    "longitude": 43.85464270466726,
  },
  pitch: 0,
  heading: 0,
  altitude: 7000000,
  zoom: 5,
};

export function HomeScreen() {
  useMixpanel('Home Page view')
  const USER_CARD_WIDTH = width;
  const USER_CARD_HEIGHT = Math.max(260, height / 4);

  const mapRef = useRef<MapView>(null);
  const carouselRef = useRef<ICarouselInstance>(null);
  const router = useRouter();
  const { getUrlPrefix, user, urgencyMode, toggleUrgencyMode } = useAuth();

  const [filters, setFilters] = useState({
    vehicle_model: 'all',
    provider_type: 'all',
  })
  const [showMap, setShowMap] = useState(true);
  const [search, setSearch] = useState<string>();

  const { data: vehiclesData } = useQuery({
    queryFn: () =>
      VehiclesService.fetchAllVehicles({
        search
      }),
    enabled: user?.active_role?.name === USER_ROLES.solo_driver,
    queryKey: ['VehiclesService.fetchAllVehicles', user?.id, `-${search}`,],
  });

  const shouldShowAddVehicleWarning = useMemo(() => {
    return user?.active_role?.name === USER_ROLES.solo_driver && !vehiclesData?.data?.length;
  }, [user, vehiclesData]);
  const renderAddVehicleWarning = () => {
    if (!shouldShowAddVehicleWarning || urgencyMode) return null;
    return (
      <View padding='$3' backgroundColor='#FF3B30' gap="$2">
        <XStack justifyContent='space-between' alignItems='center'>
          <Text flex={1} color="#FFFFFF" fontSize="$2" textAlign="left" fontWeight="bold">
            {t('common:add-vehicle-warning', 'يرجى تسجيل المركبه لاضافتها على الخريطة هنا')}
          </Text>
          <Button
            size="$2"
            backgroundColor="#FFFFFF"
            onPress={() => router.push('/app/company/vehicles/create')}
          >
            <Text color="#FF3B30" fontSize="$4" fontWeight="bold">
              {t('common:add-vehicle', 'إضافة مركبة')}
            </Text>
          </Button>
        </XStack>
      </View>
    )
  }

  const [currentRegion, setCurrentRegion] = useState<Region>({
    "latitude": 24.608423604325434,
    "longitude": 41.53168703276937,
    "latitudeDelta": 30.738793266086702,
    "longitudeDelta": 20.300612610933356,
  });

  const [drivers, setDrivers] = useState<DriverTransformer[]>([]);
  const [isFetching, setIsFetching] = useState(false);
  async function fetchDrivers(query: any = {}) {
    const queryParams = {
      perPage: Platform.select({ web: 80, ios: 80, android: 60 }),
      vehicleModel: filters.vehicle_model,
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
      latitudeDelta: currentRegion.latitudeDelta,
      longitudeDelta: currentRegion.longitudeDelta,
      search,
      ...query,
    }
    setIsFetching(true);
    const { data: driversData, meta } = await DriversService.fetchAllDrivers(queryParams);
    console.log("==============")
    console.log('queryParams::', JSON.stringify(queryParams, null, 2))
    console.log('driversData::', driversData?.length)
    console.log("==============")

    if (driversData?.length || search?.length) {
      const referenceLocation = driverLocation || currentRegion;
      const sortedDrivers = driversData.slice().sort((a, b) => {
        const aLoc = a.live_location || a.location;
        const bLoc = b.live_location || b.location;
        if (!aLoc || !bLoc) return 0;
        const aDistance = getDistance(referenceLocation, aLoc);
        const bDistance = getDistance(referenceLocation, bLoc);
        return aDistance - bDistance;
      });

      // Merge new drivers with existing ones, avoiding duplicates
      if (Platform.OS === 'ios' && !search?.length) {
        setDrivers(prevDrivers => {
          const existingIds = new Set(prevDrivers.map(d => d.id));
          const newDrivers = sortedDrivers.filter(d => !existingIds.has(d.id));
          return [...prevDrivers, ...newDrivers];
        });

        if (meta?.current_page < meta?.last_page && meta?.current_page < 5) {
          fetchDrivers({
            ...queryParams,
            page: meta?.current_page + 1,
          });
        }
      } else {
        setDrivers(sortedDrivers);
      }
    }
    setIsFetching(false);
  }
  useEffect(() => {
    fetchDrivers({
      vehicleModel: filters.vehicle_model,
      latitude: currentRegion.latitude,
      longitude: currentRegion.longitude,
      latitudeDelta: currentRegion.latitudeDelta,
      longitudeDelta: currentRegion.longitudeDelta,
      search,
      page: 1,
      urgencyServiceProvider: urgencyMode ? 1 : 0,
    });
  }, [
    filters.vehicle_model,
    currentRegion,
    search,
    filters.vehicle_model,
    urgencyMode,
  ]);

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

  const [driversList, setDriversList] = useState<DriverTransformer[]>([]);

  const [showCarousel, setShowCarousel] = useState(false);

  function getWindowedDrivers(drivers: DriverTransformer[], selectedDriver: DriverTransformer | undefined, currentRegion: Region) {
    if (!drivers || drivers.length === 0) return [];

    const referenceLocation =
      selectedDriver?.live_location ||
      selectedDriver?.location ||
      currentRegion;

    const sortedDrivers = drivers
      .filter(d => d.live_location || d.location)
      .slice()
      .sort((a, b) => {
        const aLoc = a.live_location || a.location;
        const bLoc = b.live_location || b.location;
        if (!aLoc || !bLoc) return 0;
        const aDistance = getDistance(referenceLocation, aLoc);
        const bDistance = getDistance(referenceLocation, bLoc);
        return aDistance - bDistance;
      });

    if (!selectedDriver) {
      return sortedDrivers;
    }
    const listingLimit = 14;

    const selectedIndex = sortedDrivers.findIndex(d => d.id === selectedDriver.id);
    const start = Math.max(0, selectedIndex - Math.floor(listingLimit / 2));
    const end = Math.min(sortedDrivers.length, selectedIndex + Math.ceil(listingLimit / 2));

    return sortedDrivers.slice(start, end);
  }


  const [driverLocation, setDriverLocation] = useState<Location.LocationObjectCoords | null>(null)
  const getDriverLocation = async () => {
    try {
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
    } catch (error) {

    }
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

  // on, Swipe item MAP Animation
  function onAnimateToDriver(driver: DriverTransformer) {
    if (!driver.location || !driver.live_location) return;

    if (!showCarousel) {
      setShowCarousel(true);
    }

    if (mapRef && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: Number(driver.live_location?.latitude || driver.location.latitude),
            longitude: Number(driver.live_location?.longitude || driver.location.longitude),
          },
          zoom: 16,
        },
        { duration: 1000 },
      );
    }
  }

  function onCloseCarouselButtonPress() {
    setDriversList([])
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
    if (driversList?.length < index) {
      return;
    }
    onAnimateToDriver(driversList[index]);
    setSelectedDriver(driversList[index]);
  }

  // const [selectedDriver, setSelectedDriver] = useState<DriverTransformer>();
  function onMarkerPress(driver: DriverTransformer, index: number) {
    AnalyticsService
      .storeUserAnalytic({
        user: driver.id?.toString() || '',
        requestBody: {
          action_type: 'map_view',
        }
      }).then((res) => {
        console.log('Map view analytic stored', res)
      })
    setSelectedDriver(driver);
    onAnimateToDriver(driver);
    setDriversList(getWindowedDrivers(drivers, driver, currentRegion));
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

  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) => {
      if (urgencyMode && !driver?.urgency_service_provider) {
        return false;
      }
      if (filters.vehicle_model !== 'all') {
        return driver?.vehicle?.model?.id === filters.vehicle_model;
      }
      return true;
    });
  }, [drivers, filters?.vehicle_model, urgencyMode]);

  const renderMapDrivers = () =>
    (filters.provider_type === 'all' || filters.provider_type === USER_ROLES.solo_driver) ?
      filteredDrivers.map((driver, index) => (
        <MapDriverMarker
          key={`marker-${driver?.id}`}
          driver={driver}
          isSelected={selectedDriver?.id === driver.id}
          onPress={() => {
            onMarkerPress(driver, index);
          }}
        />
      )) : null;

  const renderMapCompanies = () =>
    (filters.provider_type === 'all' || filters.provider_type === 'company') && !urgencyMode ?
      companiesQuery.data?.data?.map((company, index) => (
        <MapCompanyMarker
          key={`marker-${index}`}
          company={company}
          onPress={() => {
            router.push(`${getUrlPrefix}/companies/${company.id}`);
          }}
        />
      )) : null;

  // Debounced region setter
  const debouncedSetCurrentRegion = useMemo(
    () => debounce((region: Region) => setCurrentRegion(region), 500),
    []
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
        flex={1}
        height={USER_CARD_HEIGHT}
        marginHorizontal="$4"
        backgroundColor="$color2"
      />
    );
  };

  const defaultIndex = selectedDriver?.id
    ? driversList.findIndex((d) => d.id === selectedDriver.id)
    : 0;

  const safeDefaultIndex =
    defaultIndex >= 0 && defaultIndex < driversList.length
      ? defaultIndex
      : 0;

  const [showUrgencyCircle, setShowUrgencyCircle] = useState(false);

  return (
    <ScreenLayout>
      <YStack flex={1}>
        <AppHeaderSection search={search} setSearch={setSearch} MaterialIcons={MaterialIcons} />
        {renderAddVehicleWarning()}
        <YStack flex={1} position='relative'>
          <MapSection
            showMap={showMap}
            mapRef={mapRef}
            initialCamera={initialCamera}
            driverLocation={driverLocation}
            debouncedSetCurrentRegion={debouncedSetCurrentRegion}
            renderMapDrivers={renderMapDrivers}
            renderMapCompanies={renderMapCompanies}
            showUrgencyCircle={showUrgencyCircle}
            urgencyCircleLocation={driverLocation}
          />
          <ListSection
            showMap={showMap}
            isKeyboardVisible={isKeyboardVisible}
            driversList={filteredDrivers}
            companiesList={(filters.provider_type === 'all' || filters.provider_type === 'company') && !urgencyMode ? companiesQuery.data?.data || [] : []}
            isFetching={isFetching}
            fetchDrivers={fetchDrivers}
          />
          <CenterButton
            driverLocation={driverLocation}
            mapRef={mapRef}
            MaterialIcons={MaterialIcons}
            showMap={showMap}
            urgencyMode={urgencyMode}
          />
          <ActivateUrgencyModeButton
            mapRef={mapRef}
            driverLocation={driverLocation}
            setDriverLocation={setDriverLocation}
            setShowUrgencyCircle={setShowUrgencyCircle}
            urgencyMode={urgencyMode}
            toggleUrgencyMode={toggleUrgencyMode}
          />
          <CarouselSection
            showCarousel={showCarousel}
            driversList={driversList}
            USER_CARD_WIDTH={USER_CARD_WIDTH}
            USER_CARD_HEIGHT={USER_CARD_HEIGHT}
            carouselRef={carouselRef}
            safeDefaultIndex={safeDefaultIndex}
            renderCarouselItem={renderCarouselItem}
            onSnapToItem={onSnapToItem}
            onCloseCarouselButtonPress={onCloseCarouselButtonPress}
            X={X}
          />
          <FiltersSection
            isKeyboardVisible={isKeyboardVisible}
            filters={filters}
            setFilters={(values) => setFilters({ ...filters, ...values })}
            isFetching={isFetching}
            showCarousel={showCarousel}
            showMap={showMap}
            setShowMap={setShowMap}
            urgencyMode={urgencyMode}
          />
        </YStack>
      </YStack>
    </ScreenLayout>
  );
}

// Memoized Map Section
interface MapSectionProps {
  showMap: boolean;
  mapRef: React.RefObject<MapView>;
  initialCamera: any;
  driverLocation: Location.LocationObjectCoords | null;
  debouncedSetCurrentRegion: (region: Region) => void;
  renderMapDrivers: () => React.ReactNode;
  renderMapCompanies: () => React.ReactNode;
  showUrgencyCircle?: boolean;
  urgencyCircleLocation?: Location.LocationObjectCoords | null;
}
const MapSection: FC<MapSectionProps> = memo(function MapSection({
  showMap,
  mapRef,
  initialCamera,
  driverLocation,
  debouncedSetCurrentRegion,
  renderMapDrivers,
  renderMapCompanies,
  showUrgencyCircle,
  urgencyCircleLocation,
}) {
  if (!showMap) return null;
  return (
    <MapView
      ref={mapRef}
      style={{ flex: 1 }}
      initialCamera={initialCamera}
      onPress={() => Keyboard.dismiss()}
      showsUserLocation
      showsMyLocationButton={false}
      onRegionChangeComplete={debouncedSetCurrentRegion}
    >
      {renderMapDrivers()}
      {renderMapCompanies()}
      {showUrgencyCircle && urgencyCircleLocation && (
        <Circle
          center={{
            latitude: urgencyCircleLocation.latitude,
            longitude: urgencyCircleLocation.longitude,
          }}
          radius={5000} // 20km
          strokeColor="#FF3B30"
          fillColor="rgba(255,59,48,0.15)"
        />
      )}
    </MapView>
  );
});

// Memoized List Section
interface ListSectionProps {
  showMap: boolean;
  isKeyboardVisible: boolean;
  driversList: DriverTransformer[];
  companiesList: CompanyTransformer[];
  isFetching: boolean;
  fetchDrivers: (query?: any) => Promise<void>;
}
const ListSection: FC<ListSectionProps> = memo(function ListSection({
  showMap,
  isKeyboardVisible,
  driversList,
  companiesList,
  isFetching,
  fetchDrivers,
}) {
  const renderListData = [
    {
      data: driversList || [],
      renderItem: ({ item, index }) => (
        <UserCard
          key={`stack-${item.id}-${index}`}
          user={item}
          flex={1}
          marginHorizontal="$4"
          marginVertical="$2"
          backgroundColor="$color2"
        />
      ),
    },
    {
      data: companiesList || [],
      renderItem: ({ item, index }) => (
        <CompanyCard
          key={`stack-company-${item.id}-${index}`}
          user={item}
          flex={1}
          marginHorizontal="$4"
          marginVertical="$2"
          backgroundColor="$color2"
        />
      ),
    },
  ];
  if (showMap) return null;
  return (
    <View flex={1} marginTop={isKeyboardVisible ? 0 : "$10"}>
      <SectionList
        style={{ flex: 1 }}
        sections={renderListData}
        keyExtractor={(item: DriverTransformer, index) => `driver-${item.id}-${index}`}
        refreshing={isFetching}
        onRefresh={fetchDrivers}
        ListEmptyComponent={
          <View flex={1} alignItems='center' gap="$8">
            <CustomIcon name="empty_data" size="$18" color="$color5" />
            <H4>No Data Found!</H4>
          </View>
        }
      />
    </View>
  );
});

// Memoized Carousel Section
interface CarouselSectionProps {
  showCarousel: boolean;
  driversList: DriverTransformer[];
  USER_CARD_WIDTH: number;
  USER_CARD_HEIGHT: number;
  carouselRef: React.RefObject<ICarouselInstance>;
  safeDefaultIndex: number;
  renderCarouselItem: (props: { item: DriverTransformer; index: number }) => JSX.Element;
  onSnapToItem: (index: number) => void;
  onCloseCarouselButtonPress: () => void;
  X: any;
}
const CarouselSection: FC<CarouselSectionProps> = memo(function CarouselSection({
  showCarousel,
  driversList,
  USER_CARD_WIDTH,
  USER_CARD_HEIGHT,
  carouselRef,
  safeDefaultIndex,
  renderCarouselItem,
  onSnapToItem,
  onCloseCarouselButtonPress,
  X,
}) {
  if (!showCarousel || driversList.length === 0) return null;
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
        key={driversList.length}
        ref={carouselRef}
        width={USER_CARD_WIDTH}
        height={USER_CARD_HEIGHT}
        autoPlay={false}
        data={driversList}
        defaultIndex={safeDefaultIndex}
        renderItem={renderCarouselItem}
        onSnapToItem={onSnapToItem}
      />
    </YStack>
  );
});

// Memoized Switcher Button
interface SwitcherButtonProps {
  showCarousel: boolean;
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
  t: typeof t;
  urgencyMode: boolean;
}
const SwitcherButton: FC<SwitcherButtonProps> = memo(function SwitcherButton({
  showCarousel,
  showMap,
  setShowMap,
  t,
  urgencyMode
}) {
  if (showCarousel) return null;
  return (
    <Button
      theme="accent"
      backgroundColor={urgencyMode ? "#FF3B30" : undefined}
      icon={showMap ? List : Map}
      scaleIcon={1.5}
      fontWeight="600"
      fontSize="$2"
      size="$3"
      onPress={() => setShowMap(!showMap)}
    />
  );
});

// Memoized Center Button
interface CenterButtonProps {
  driverLocation: Location.LocationObjectCoords | null;
  mapRef: React.RefObject<MapView>;
  MaterialIcons: any;
  showMap: boolean;
  urgencyMode: boolean;
}
const CenterButton: FC<CenterButtonProps> = memo(function CenterButton({
  driverLocation,
  mapRef,
  MaterialIcons,
  showMap,
  urgencyMode
}) {
  async function onPress() {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      mapRef?.current?.animateCamera({
        center: {
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        },
        zoom: 16,
      });
    } catch (error) {
      //
    }

  }

  if (!showMap) return null;
  return (
    <Button
      theme="accent"
      backgroundColor={urgencyMode ? "#FF3B30" : undefined}
      icon={<MaterialIcons name="my-location" size={30} color="black" />}
      circular
      position="absolute"
      bottom="$3"
      right="$4"
      onPress={() => onPress()}
    />
  );
});

// ActivateUrgencyModeButton
interface ActivateUrgencyModeButtonProps {
  urgencyMode: boolean;
  toggleUrgencyMode: () => void;
  mapRef: React.RefObject<MapView>;
  driverLocation: Location.LocationObjectCoords | null;
  setDriverLocation: (location: Location.LocationObjectCoords | null) => void;
  setShowUrgencyCircle: (show: boolean) => void;
}
const ActivateUrgencyModeButton: FC<ActivateUrgencyModeButtonProps> = ({
  urgencyMode,
  toggleUrgencyMode,
  mapRef,
  driverLocation,
  setDriverLocation,
  setShowUrgencyCircle,
}) => {
  // Animation shared values
  const progress = useSharedValue(urgencyMode ? 1 : 0);
  const scale = useSharedValue(1);

  const animateToLocation = (location: Location.LocationObjectCoords) => {
    if (!mapRef?.current) return;
    
    if (Platform.OS === 'ios') {
      mapRef.current.animateCamera({
        center: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        altitude: 40000,
        pitch: 0,
        heading: 0,
      }, { duration: 1000 });
    } else {
      mapRef.current.animateCamera({
        center: {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        zoom: 12,
      }, { duration: 1000 });
    }
  };

  const handleUrgencyModeToggle = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert(
          'تنبيه',
          'يجب السماح للتطبيق بالوصول إلى موقعك لتفعيل وضع الطوارئ. يرجى تفعيل خدمة الموقع من إعدادات الجهاز.',
          [
            {
              text: 'حسناً',
              style: 'default',
            },
            {
              text: 'فتح الإعدادات',
              onPress: () => Linking.openSettings(),
              style: 'default',
            },
          ]
        );
        return;
      }
      // If permission granted, get location and then toggle
      const location = await Location.getCurrentPositionAsync({});
      setDriverLocation(location.coords);
      animateToLocation(location.coords);
    } catch (error) {
      Alert.alert(
        'خطأ',
        'حدث خطأ أثناء محاولة الوصول إلى موقعك. يرجى المحاولة مرة أخرى.',
        [
          {
            text: 'حسناً',
            style: 'default',
          },
        ]
      );
      return;
    }
    toggleUrgencyMode();
  };

  useEffect(() => {
    progress.value = withTiming(urgencyMode ? 1 : 0, { duration: 500, easing: Easing.out(Easing.exp) });
    setShowUrgencyCircle(urgencyMode);
    if (urgencyMode && driverLocation) {
      animateToLocation(driverLocation);
    }
  }, [urgencyMode]);

  // Animated background color
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#FFF5F5', '#FF3B30'] // Outlined to filled
    ),
    borderColor: '#FF3B30',
    borderWidth: 2,
    transform: [{ scale: scale.value }],
  }));

  // Animated text color
  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(
      progress.value,
      [0, 1],
      ['#FF3B30', '#FFFFFF']
    ),
    fontWeight: 'bold',
    fontSize: 20,
    marginLeft: 8,
  }));

  // Animated icon style (scale/rotate for fun)
  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(urgencyMode ? 1.1 : 1, { duration: 300 }) },
      { rotate: `${progress.value * 180}deg` },
    ],
  }));

  // Handle press animation
  const handlePressIn = () => {
    scale.value = withTiming(0.95, { duration: 100 });
  };
  const handlePressOut = () => {
    scale.value = withTiming(1, { duration: 100 });
  };

  return (
    <Animated.View style={[{ position: 'absolute', bottom: 12, left: 16, borderRadius: 12, overflow: 'hidden' }, animatedStyle]}>
      <Pressable
        onPress={handleUrgencyModeToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{ flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, paddingVertical: 6 }}
        accessibilityRole="button"
        accessibilityLabel={urgencyMode ? 'خروج' : 'طوارئ'}
      >
        <Animated.View style={animatedIconStyle}>
          {urgencyMode ? (
            <X color="#fff" size={28} />
          ) : (
            <CustomIcon name="urgency" size={28} color="#FF3B30" />
          )}
        </Animated.View>
        <Animated.Text style={animatedTextStyle}>
          {urgencyMode ? 'خروج' : 'طوارئ'}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
}

// Memoized Filters Section
interface FiltersSectionProps {
  isKeyboardVisible: boolean;
  filters: { vehicle_model: string; provider_type: string };
  setFilters: (values: Record<string, string>) => void;
  isFetching: boolean;
  showCarousel: boolean;
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
  urgencyMode: boolean;
}
const FiltersSection: FC<FiltersSectionProps> = memo(function FiltersSection({
  isKeyboardVisible,
  filters,
  setFilters,
  isFetching,
  showCarousel,
  showMap,
  setShowMap,
  urgencyMode
}) {
  if (isKeyboardVisible) return null;
  return (
    <View position='absolute' top={1} left={1} right={1}>
      <XStack alignItems='center' paddingHorizontal="$2" gap="$2">
        <SwitcherButton
          showCarousel={showCarousel}
          showMap={showMap}
          setShowMap={setShowMap}
          t={t}
          urgencyMode={urgencyMode}
        />
        <MapFilters urgencyMode={urgencyMode} values={filters} onChange={(values) => setFilters({ ...filters, ...values })} />
        {isFetching && <Spinner color="$color1" />}
      </XStack>
    </View>
  );
});

// Memoized AppHeader Section
interface AppHeaderSectionProps {
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  MaterialIcons: any;
}
const AppHeaderSection: FC<AppHeaderSectionProps> = memo(function AppHeaderSection({
  search,
  setSearch,
  MaterialIcons,
}) {
  return (
    <AppHeader
      showSearchBar
      searchProps={{
        value: search,
        onChangeText: setSearch,
        rightIcon: () => (
          search && search.length > 0 ? (
            <Button
              unstyled
              theme="accent"
              icon={<MaterialIcons name="cancel" size={24} color={'grey'} />}
              onPress={() => setSearch('')}
            />
          ) : null
        ),
      }}
    />
  );
});

export default HomeScreen;
