import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useIsFocused } from '@react-navigation/native';
import { X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { CompaniesService, CompanyTransformer, DriverTransformer, DriversService, LocationService } from '@zix/api';
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
import { Dimensions, Keyboard, Platform, SectionList } from 'react-native';
import MapView, { Region } from 'react-native-maps';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRouter } from 'solito/router';
import { Button, H4, Spinner, View, XStack, YStack } from 'tamagui';
import MapFilters from '../../components/map-filters/map-filters';
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
  zoom: 16,
};

export function HomeScreen() {
  useMixpanel('Home Page view')
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
      perPage: Platform.select({ web: 80, ios: 80, android: 80 }),
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
      if (Platform.OS === 'ios') {
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
    });
  }, [
    filters.vehicle_model,
    currentRegion,
    search,
    filters.vehicle_model,
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
      if (filters.vehicle_model !== 'all') {
        return driver?.vehicle?.model?.id === filters.vehicle_model;
      }
      return true;
    });
  }, [drivers, filters?.vehicle_model]);

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

  // Debounced region setter
  const debouncedSetCurrentRegion = useMemo(
    () => debounce((region: Region) => setCurrentRegion(region), 500),
    []
  );

  //List
  const showCompany = filters.provider_type === 'all' || filters.provider_type === 'company';

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

  return (
    <ScreenLayout>
      <YStack flex={1}>
        <AppHeaderSection search={search} setSearch={setSearch} MaterialIcons={MaterialIcons} />
        <YStack flex={1} position='relative'>
          <MapSection
            showMap={showMap}
            mapRef={mapRef}
            initialCamera={initialCamera}
            driverLocation={driverLocation}
            debouncedSetCurrentRegion={debouncedSetCurrentRegion}
            renderMapDrivers={renderMapDrivers}
            renderMapCompanies={renderMapCompanies}
          />
          <ListSection
            showMap={showMap}
            isKeyboardVisible={isKeyboardVisible}
            driversList={filters.provider_type === 'all' || filters.provider_type === USER_ROLES.solo_driver ? drivers : []}
            companiesList={filters.provider_type === 'all' || filters.provider_type === 'company' ? companiesQuery.data?.data || [] : []}
            isFetching={isFetching}
            fetchDrivers={fetchDrivers}
          />
          <SwitcherButton
            showCarousel={showCarousel}
            showMap={showMap}
            setShowMap={setShowMap}
            t={t}
          />
          <CenterButton
            driverLocation={driverLocation}
            mapRef={mapRef}
            MaterialIcons={MaterialIcons}
            showMap={showMap}
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
}
const MapSection: FC<MapSectionProps> = memo(function MapSection({
  showMap,
  mapRef,
  initialCamera,
  driverLocation,
  debouncedSetCurrentRegion,
  renderMapDrivers,
  renderMapCompanies,
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
}
const SwitcherButton: FC<SwitcherButtonProps> = memo(function SwitcherButton({
  showCarousel,
  showMap,
  setShowMap,
  t,
}) {
  if (showCarousel) return null;
  return (
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
      {showMap ? t('common:list') : t('common:map')}
    </Button>
  );
});

// Memoized Center Button
interface CenterButtonProps {
  driverLocation: Location.LocationObjectCoords | null;
  mapRef: React.RefObject<MapView>;
  MaterialIcons: any;
  showMap: boolean;
}
const CenterButton: FC<CenterButtonProps> = memo(function CenterButton({
  driverLocation,
  mapRef,
  MaterialIcons,
  showMap,
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
      icon={<MaterialIcons name="my-location" size={20} color="black" />}
      circular
      position="absolute"
      bottom="$3"
      right="$4"
      onPress={() => onPress()}
    />
  );
});

// Memoized Filters Section
interface FiltersSectionProps {
  isKeyboardVisible: boolean;
  filters: { vehicle_model: string; provider_type: string };
  setFilters: (values: Record<string, string>) => void;
  isFetching: boolean;
}
const FiltersSection: FC<FiltersSectionProps> = memo(function FiltersSection({
  isKeyboardVisible,
  filters,
  setFilters,
  isFetching,
}) {
  if (isKeyboardVisible) return null;
  return (
    <View position='absolute' top={1} left={1} right={1}>
      <XStack alignItems='center' justifyContent='space-between'>
        <MapFilters values={filters} onChange={(values) => setFilters({ ...filters, ...values })} />
        {isFetching && <Spinner />}
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
