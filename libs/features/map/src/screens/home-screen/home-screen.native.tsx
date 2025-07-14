import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import { LayoutList, Map, X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import {
  CompaniesService,
  CompanyTransformer,
  LocationService,
} from '@zix/api';
import { CompanyCard } from '@zix/features/company';
import { USER_ROLES, useAuth, useMixpanel } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { AppCustomHeader, ScreenLayout } from '@zix/ui/layouts';
import { MapCompanyMarker } from '@zix/ui/sawaeed';
import * as Location from 'expo-location';
import { t } from 'i18next';
import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Keyboard,
  Platform
} from 'react-native';
import MapView, { Circle, Region } from 'react-native-maps';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRouter } from 'solito/router';
import { Button, H4, Spinner, Text, View, XStack, YStack } from 'tamagui';
// import MapFilters from '../../components/map-filters/map-filters';
import { useToastController } from '@tamagui/toast';
const { width } = Dimensions.get('window');
const { height } = Dimensions.get('window');

const initialCamera = {
  center: {
    // latitude: 24.713552,
    // longitude: 46.675296,
    latitude: 24.66962499163617,
    longitude: 43.85464270466726,
  },
  pitch: 0,
  heading: 0,
  altitude: 7000000,
  zoom: 5,
};

const mapStyle = [
  {
    elementType: 'labels.icon',
    stylers: [{ visibility: 'off' }],
  },
  {
    featureType: 'administrative.land_parcel',
    stylers: [{ visibility: 'off' }],
  },
];

export function HomeScreen() {
  useMixpanel('Home Page view');
  const USER_CARD_WIDTH = width;
  const USER_CARD_HEIGHT = Math.max(100, height / 5.5);

  const mapRef = useRef<MapView>(null);
  const carouselRef = useRef<ICarouselInstance>(null);
  const toast = useToastController();
  const router = useRouter();
  const { getUrlPrefix, user, urgencyMode } = useAuth();

  const [filters, setFilters] = useState({
    vehicle_model: 'all',
    provider_type: 'all',
  });
  const [showMap, setShowMap] = useState(true);
  const [search, setSearch] = useState<string>();



  const [currentRegion, setCurrentRegion] = useState<Region>({
    latitude: 24.608423604325434,
    longitude: 41.53168703276937,
    latitudeDelta: 30.738793266086702,
    longitudeDelta: 20.300612610933356,
  });

  const [isFetching, setIsFetching] = useState(false);
  const [driverLocation, setDriverLocation] =
    useState<Location.LocationObjectCoords | null>(null);

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
  const [selectedCompany, setSelectedCompany] = useState<CompanyTransformer>();

  const [companiesList, setCompaniesList] = useState<CompanyTransformer[]>([]);

  const [showCarousel, setShowCarousel] = useState(false);

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
          longitude: location.coords.longitude,
        },
      });
    } catch (error) {
      //
    }
  };

  const updateLocationInterval = useRef<NodeJS.Timeout | null>(null);
  useEffect(() => {
    setDriverLocation(null);
    if (
      ![USER_ROLES.solo_driver, USER_ROLES.company_driver].includes(
        user.active_role?.name as any,
      )
    ) {
      return;
    }
    if (driverLocation?.latitude) {
      updateLocationInterval.current = setInterval(
        () => {
          getDriverLocation();
        },
        1000 * 60 * 5,
      );
    }
    getDriverLocation();
    return () => {
      if (updateLocationInterval.current) {
        clearInterval(updateLocationInterval.current);
      }
    };
  }, [user]);

  // on, Swipe item MAP Animation
  function onAnimateToCompany(company: CompanyTransformer) {
    // Use the first branch location if available, or skip if no location
    const branchLocation = company.branches?.location;
    if (!branchLocation) return;

    if (!showCarousel) {
      setShowCarousel(true);
    }

    if (mapRef && mapRef.current) {
      mapRef.current.animateCamera(
        {
          center: {
            latitude: Number(branchLocation.latitude),
            longitude: Number(branchLocation.longitude),
          },
          zoom: 16,
        },
        { duration: 1000 },
      );
    }
  }

  function onCloseCarouselButtonPress() {
    setCompaniesList([]);
    setShowCarousel(false);
    setSelectedCompany(undefined);
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
    if (companiesList?.length < index) {
      return;
    }
    onAnimateToCompany(companiesList[index]);
    setSelectedCompany(companiesList[index]);
  }

  // Keyboard Detect
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardDidShow',
        () => setKeyboardVisible(true),
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardDidHide',
        () => setKeyboardVisible(false),
      );

      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    } else {
      setKeyboardVisible(false);
    }
  }, [isFocused]);

  // const [isCentered, setIsCentered] = useState(false);
  // useEffect(() => {
  //   if (showMap && !isCentered) {
  //     autoCenterToUserLocation();
  //     setIsCentered(true);
  //   }
  // }, [showMap, isCentered])

  // TODO: KEEP
  useFocusEffect(
    useCallback(() => {
      // autoCenterToUserLocation()
    }, []),
  );

  async function autoCenterToUserLocation() {
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
        altitude: 40000,
        pitch: 0,
        heading: 0,
        zoom: 12,
      });
    } catch (error) {
      //
    }
  }

  const renderMapCompanies = () =>
    (filters.provider_type === 'all' || filters.provider_type === 'company') &&
    !urgencyMode
      ? companiesQuery.data?.data?.map((company, index) => (
          <>
            <MapCompanyMarker
              key={`marker-${company.id}-${index}`}
              company={company}
              onPress={() => {
                setCompaniesList([company]);
                setSelectedCompany(company);
                setShowCarousel(true);
                onAnimateToCompany(company);
              }}
            />
 
            {company.branches && (
              <MapCompanyMarker
                key={`marker-${company.id}-${company.branches.id}`}
                company={company}
                branch={company.branches}
                onPress={() => {
                  setCompaniesList([company]);
                  setSelectedCompany(company);
                  setShowCarousel(true);
                  onAnimateToCompany(company);
                }}
              />
            )}
          </>
        ))
      : null;

  // Debounced region setter
  const regionTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const debouncedSetCurrentRegion = useMemo(
    () => (region: Region) => {
      if (regionTimeoutRef.current) {
        clearTimeout(regionTimeoutRef.current);
      }
      regionTimeoutRef.current = setTimeout(
        () => setCurrentRegion(region),
        500,
      );
    },
    [],
  );

  const renderCarouselItem = ({
    item,
    index,
  }: {
    index: number;
    item: CompanyTransformer;
  }) => {
    return (
      <CompanyCard
        key={`view-${item.id}-${index}`}
        company={item}
        flex={1}
        height={USER_CARD_HEIGHT}
        marginHorizontal="$4"
        backgroundColor="$color2"
      />
    );
  };

  const defaultIndex = selectedCompany?.id
    ? companiesList.findIndex((c) => c.id === selectedCompany.id)
    : 0;

  const safeDefaultIndex =
    defaultIndex >= 0 && defaultIndex < companiesList.length ? defaultIndex : 0;

  const [showUrgencyCircle, setShowUrgencyCircle] = useState(false);

  return (
    <ScreenLayout>
      <YStack flex={1}>
        <AppHeaderSection
          search={search}
          setSearch={setSearch}
          MaterialIcons={MaterialIcons}
        />
        <YStack flex={1} position="relative">
          <MapSection
            showMap={showMap}
            mapRef={mapRef}
            initialCamera={initialCamera}
            driverLocation={driverLocation}
            debouncedSetCurrentRegion={debouncedSetCurrentRegion}
            renderMapCompanies={renderMapCompanies}
            showUrgencyCircle={showUrgencyCircle}
            urgencyCircleLocation={driverLocation}
          />
          <ListSection
            showMap={showMap}
            isKeyboardVisible={isKeyboardVisible}
            companiesList={
              (filters.provider_type === 'all' ||
                filters.provider_type === 'company') &&
              !urgencyMode
                ? companiesQuery.data?.data || []
                : []
            }
            isFetching={isFetching}
          />
          <CenterButton
            showMap={showMap}
            autoCenterToUserLocation={autoCenterToUserLocation}
          />
          <CarouselSection
            showCarousel={showCarousel}
            companiesList={companiesList}
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
  renderMapCompanies: () => React.ReactNode;
  showUrgencyCircle?: boolean;
  urgencyCircleLocation?: Location.LocationObjectCoords | null;
}
const MapSection: FC<MapSectionProps> = memo(function MapSection({
  showMap,
  mapRef,
  initialCamera,
  debouncedSetCurrentRegion,
  renderMapCompanies,
  showUrgencyCircle,
  urgencyCircleLocation,
}) {
  if (!showMap) return null;
  return (
    <MapView
      ref={mapRef}
      showsPointsOfInterest={false}
      customMapStyle={mapStyle}
      style={{ flex: 1 }}
      initialCamera={initialCamera}
      onPress={() => Keyboard.dismiss()}
      showsUserLocation
      showsMyLocationButton={false}
      onRegionChangeComplete={debouncedSetCurrentRegion}
    >
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
  companiesList: CompanyTransformer[];
  isFetching: boolean;
}
const ListSection: FC<ListSectionProps> = memo(function ListSection({
  showMap,
  isKeyboardVisible,
  companiesList,
  isFetching,
}) {
  if (showMap) return null;
  return (
    <View flex={1} marginTop={isKeyboardVisible ? 0 : '$10'}>
      <FlatList
        style={{ flex: 1 }}
        data={companiesList}
        keyExtractor={(item: CompanyTransformer, index) =>
          `company-${item.id}-${index}`
        }
        renderItem={({ item, index }) => (
          <CompanyCard
            key={`stack-company-${item.id}-${index}`}
            company={item}
            flex={1}
            marginHorizontal="$4"
            marginVertical="$2"
            backgroundColor="$color2"
            useShowButton={false}
          />
        )}
        refreshing={isFetching}
        onRefresh={() => {
          // TODO
        }}
        ListEmptyComponent={
          <View flex={1} alignItems="center" gap="$2">
            <CustomIcon name="empty_data" size="$18" color="$color5" />
            <H4 color="#8590A2">لا يوجد بيانات</H4>
          </View>
        }
      />
    </View>
  );
});

// Memoized Carousel Section
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
  urgencyMode,
}) {
  // if (showCarousel) return null;
  return (
    <Button
      theme="accent"
      color={'#FFFFFF'}
      icon={showMap ? LayoutList : Map}
      scaleIcon={1.75}
      fontWeight="500"
      fontSize="$2"
      size="$3"
      onPress={() => setShowMap(!showMap)}
    />
  );
});

// Memoized Center Button
interface CenterButtonProps {
  showMap: boolean;
  autoCenterToUserLocation: () => Promise<void>;
}
const CenterButton: FC<CenterButtonProps> = memo(function CenterButton({
  showMap,
  autoCenterToUserLocation,
}) {
  if (!showMap) return null;
  return (
    <Button
      theme="accent"
      icon={<CustomIcon name="my_location" size={30} color={'#FFFFFF'} />}
      circular
      position="absolute"
      bottom="$3"
      right="$4"
      onPress={() => autoCenterToUserLocation()}
    />
  );
});

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
  urgencyMode,
}) {
  if (isKeyboardVisible) return null;
  return (
    <View position="absolute" bottom={showCarousel ? 270 : 10} left={1} right={1}>
      <XStack
        alignItems="center"
        paddingHorizontal="$2"
        gap="$2"
        paddingTop="$2"
      >
        <SwitcherButton
          showCarousel={showCarousel}
          showMap={showMap}
          setShowMap={setShowMap}
          t={t}
          urgencyMode={urgencyMode}
        />
        {/* <MapFiltersTaklifa
          urgencyMode={urgencyMode}
          values={filters}
          onChange={(values) => setFilters({ ...filters, ...values })}
        /> */}
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
const AppHeaderSection: FC<AppHeaderSectionProps> = memo(
  function AppHeaderSection({ search, setSearch, MaterialIcons }) {
    return  (
      <AppCustomHeader
        showSearchBar
        
      //   searchProps={{
      //     value: search,
      //     onChangeText: setSearch,
      //     rightIcon: () =>
      //       search && search.length > 0 ? (
      //         <Button
      //           unstyled
      //           theme="accent"
      //           icon={<MaterialIcons name="cancel" size={24} color={'grey'} />}
      //           onPress={() => setSearch('')}
                
      //         />
      //       ) : null,
      //   }}
      />
    );
  },
);

export default HomeScreen;
