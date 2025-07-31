import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useFocusEffect, useIsFocused } from '@react-navigation/native';
import {
  LayoutList,
  Map,
  ShoppingCart,
  Upload,
  X,
} from '@tamagui/lucide-icons';
import {
  QueryClientProvider,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  CompaniesService,
  CompanyTransformer,
  LocationService,
} from '@zix/api';
import { CompanyCard } from '@zix/features/company';
import { useAuth, useMixpanel, USER_ROLES } from '@zix/services/auth';
import { CustomIcon } from '@zix/ui/icons';
import { AppCustomHeader, AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { MapCompanyMarker } from '@zix/ui/sawaeed';
import * as Location from 'expo-location';
import { t } from 'i18next';
import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  Alert,
  FlatList,
  Keyboard,
  Linking,
  Platform,
  Pressable,
  RefreshControl,
  Share,
  Image,
} from 'react-native';
import MapView, { Circle, Region } from 'react-native-maps';
import { Button, H4, View, XStack, YStack } from 'tamagui';
// import MapFilters from '../../components/map-filters/map-filters';
import { ZixButton, ZixDialog } from '@zix/ui/common';
import Animated, {
  Easing,
  interpolateColor,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import { CompanyDetail } from '../../components/company-detail/company-detail';
import { KeyboardAwareFlatList } from 'react-native-keyboard-aware-scroll-view';

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

  const mapRef = useRef<MapView>(null);
  const { user, saudiProductsMode, toggleSaudiProductsMode } = useAuth();

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
        hasSaudiProducts: saudiProductsMode ? 1 : 0,
      });
    },
    queryKey: [
      'CompaniesService.fetchAllCompanies -12',
      search,
      saudiProductsMode,
    ],
    staleTime: 5 * 1000,
  });
  // const usersQuery = useQuery({
  //   queryFn: () => UsersService.fetchAllUsers(),
  //   queryKey: ['UsersService.fetchAllUsers'],
  // });
  const [selectedCompany, setSelectedCompany] = useState<CompanyTransformer>();

  const [companiesList, setCompaniesList] = useState<CompanyTransformer[]>([]);

  const queryClient = useQueryClient();

  const [showCarousel, setShowCarousel] = useState(false);
  const [open, setOpen] = useState(false);

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
        // we need to an alert to the user to allow the location permission from the settings
        Alert.alert(
          'Permission to access location was denied',
          'Please allow the location permission from the settings',
          [
            {
              text: 'Open Settings',
              onPress: () => {
                Linking.openSettings();
              },
            },
            {
              text: 'Cancel',
              onPress: () => {
                //
              },
            },
          ],
        );
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
    filters.provider_type === 'all' || filters.provider_type === 'company'
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
                setOpen(true);
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
                  setOpen(true);
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

  const [showUrgencyCircle, setShowUrgencyCircle] = useState(false);
  return (
    <ScreenLayout>
      <YStack flex={1}>
        <AppHeaderSection
          search={search}
          setSearch={setSearch}
          MaterialIcons={MaterialIcons}
          showMap={showMap}
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
            companiesList={
              filters.provider_type === 'all' ||
              filters.provider_type === 'company'
                ? companiesQuery.data?.data || []
                : []
            }
            isFetching={isFetching}
          />

          <ZixDialog
            title={selectedCompany?.name || ''}
            justifyContentTitle={'space-between'}
            rigthComponent={
              <XStack gap="$4" alignItems="center" justifyContent="center">
                <ZixButton
                  size="$3"
                  backgroundColor="#F1F2F4"
                  justifyContent="center"
                  alignItems="center"
                  unstyled
                  circular
                  onPress={() => {
                    // alert('upload');
                    // share link
                    Share.share({
                      message: `https://taklifa.com/app/companies/${selectedCompany?.id}`,
                      url: `https://taklifa.com/app/companies/${selectedCompany?.id}`,
                    });
                  }}
                >
                  <Upload size={16} color="black" />
                </ZixButton>
                <ZixButton
                  size="$3"
                  backgroundColor="#F1F2F4"
                  justifyContent="center"
                  alignItems="center"
                  unstyled
                  circular
                  onPress={() => {
                    setOpen(false);
                  }}
                >
                  <X size={16} color="black" />
                </ZixButton>
              </XStack>
            }
            snapPoints={[80]}
            disableDrag={true}
            contentPadding="$3"
            open={open}
            onOpenChange={setOpen}
          >
            <QueryClientProvider client={queryClient}>
              <CompanyDetail
                company={selectedCompany || ({} as CompanyTransformer)}
                setShowSheet={setOpen}
              />
            </QueryClientProvider>
          </ZixDialog>
          <FiltersSection
            isKeyboardVisible={isKeyboardVisible}
            filters={filters}
            setFilters={(values) => setFilters({ ...filters, ...values })}
            isFetching={isFetching}
            showCarousel={showCarousel}
            showMap={showMap}
            setShowMap={setShowMap}
            saudiProductsMode={saudiProductsMode}
            autoCenterToUserLocation={autoCenterToUserLocation}
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
  companiesList: CompanyTransformer[];
  isFetching: boolean;
}
const ListSection: FC<ListSectionProps> = memo(function ListSection({
  showMap,
  companiesList,
  isFetching,
}) {
  if (showMap) return null;
  // const tabs = useMemo(() => {
  //   const _tabs = [
  //     {
  //       key: 'company',
  //       title: 'الشركات و المؤسسات',
  //       content: (
  //         <FlatList
  //           style={{ flex: 1 }}
  //           data={companiesList}
  //           keyExtractor={(item: CompanyTransformer, index) =>
  //             `company-${item.id}-${index}`
  //           }
  //           showsVerticalScrollIndicator={false}
  //           renderItem={({ item, index }) => (
  //             <CompanyCard
  //               key={`stack-company-${item.id}-${index}`}
  //               company={item}
  //               flex={1}
  //               marginVertical="$2"
  //               backgroundColor="$color2"
  //               useShowButton={false}
  //             />
  //           )}
  //           refreshing={isFetching}
  //           onRefresh={() => {
  //             // TODO
  //           }}
  //           ListEmptyComponent={
  //             <View flex={1} alignItems="center" gap="$2">
  //               <CustomIcon name="empty_data" size="$18" color="$color5" />
  //               <H4 color="#8590A2">لا يوجد بيانات</H4>
  //             </View>
  //           }
  //         />
  //       ),
  //     },
  //     {
  //       key: 'individual',
  //       title: 'الأفراد',
  //       content: (
  //         <FlatList
  //           style={{ flex: 1 }}
  //           data={usersList}
  //           keyExtractor={(item: UserTransformer, index) =>
  //             `user-${item.id}-${index}`
  //           }
  //           showsVerticalScrollIndicator={false}
  //           renderItem={({ item, index }) => (
  //             <UserCard
  //               key={`stack-user-${item.id}-${index}`}
  //               user={item}
  //               flex={1}
  //               marginVertical="$2"
  //               backgroundColor="$color2"
  //             />
  //           )}
  //           refreshing={isFetching}
  //           onRefresh={() => {
  //             // TODO
  //           }}
  //           ListEmptyComponent={
  //             <View flex={1} alignItems="center" gap="$2">
  //               <CustomIcon name="empty_data" size="$18" color="$color5" />
  //               <H4 color="#8590A2">لا يوجد بيانات</H4>
  //             </View>
  //           }
  //         />
  //       ),
  //     },
  //   ];
  //   return _tabs;
  // }, []);
  return (
    <View flex={1} margin="$5" marginVertical="0">
      <KeyboardAwareFlatList
        extraScrollHeight={Platform.OS === 'ios' ? 200 : 100}
        enableOnAndroid={true}
        keyboardShouldPersistTaps="handled"
        style={{ flex: 1 }}
        data={companiesList}
        keyExtractor={(item: CompanyTransformer, index) =>
          `company-${item.id}-${index}`
        }
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <CompanyCard
            key={`stack-company-${item.id}-${index}`}
            company={item}
            flex={1}
            marginVertical="$2"
            backgroundColor="$color2"
            useShowButton={false}
          />
        )}
        // refreshing={isFetching}
        refreshControl={
          <RefreshControl
            refreshing={isFetching}
            onRefresh={() => {
              // TODO
            }}
          />
        }
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

// Memoized Switcher Button
interface SwitcherButtonProps {
  showMap: boolean;
  setShowMap: React.Dispatch<React.SetStateAction<boolean>>;
}
const SwitcherButton: FC<SwitcherButtonProps> = memo(function SwitcherButton({
  showMap,
  setShowMap,
}) {
  return (
    <Button
      theme="accent"
      color={'#FFFFFF'}
      backgroundColor="$color1"
      icon={showMap ? LayoutList : Map}
      scaleIcon={1.75}
      fontWeight="500"
      fontSize="$2"
      size="$3"
      width={50}
      height={40}
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
      backgroundColor="$color1"
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
  saudiProductsMode: boolean;
  autoCenterToUserLocation: () => Promise<void>;
}
const FiltersSection: FC<FiltersSectionProps> = memo(function FiltersSection({
  isKeyboardVisible,
  filters,
  setFilters,
  isFetching,
  showCarousel,
  showMap,
  setShowMap,
  saudiProductsMode,
  autoCenterToUserLocation,
}) {
  if (isKeyboardVisible) return null;
  return (
    <View position="absolute" bottom="$3" left="$4" right="$4">
      <XStack justifyContent="space-between">
        <SwitcherButton showMap={showMap} setShowMap={setShowMap} />
        <ActivateSaudiProductsModeButton />
        <CenterButton
          showMap={showMap}
          autoCenterToUserLocation={autoCenterToUserLocation}
        />
      </XStack>
      {/* <MapFiltersTaklifa
          saudiProductsMode={saudiProductsMode}
          values={filters}
          onChange={(values) => setFilters({ ...filters, ...values })}
        /> */}
    </View>
  );
});

// Memoized AppHeader Section
interface AppHeaderSectionProps {
  search: string | undefined;
  setSearch: React.Dispatch<React.SetStateAction<string | undefined>>;
  MaterialIcons: any;
  showMap: boolean;
}
const AppHeaderSection: FC<AppHeaderSectionProps> = memo(
  function AppHeaderSection({ search, setSearch, MaterialIcons, showMap }) {
    return showMap ? (
      <AppCustomHeader showSearchBar />
    ) : (
      <AppHeader
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: setSearch,
          rightIcon: () =>
            search && search.length > 0 ? (
              <Button
                unstyled
                theme="accent"
                icon={<MaterialIcons name="cancel" size={24} color={'grey'} />}
                onPress={() => setSearch('')}
              />
            ) : null,
        }}
      />
    );
  },
);

const ActivateSaudiProductsModeButton = () => {
  const { saudiProductsMode, toggleSaudiProductsMode } = useAuth();
  // Animation shared values
  const progress = useSharedValue(saudiProductsMode ? 1 : 0);
  const scale = useSharedValue(1);

  const handleSaudiProductsModeToggle = async () => {
    toggleSaudiProductsMode();
  };

  useEffect(() => {
    progress.value = withTiming(saudiProductsMode ? 1 : 0, {
      duration: 500,
      easing: Easing.out(Easing.exp),
    });
  }, [saudiProductsMode]);

  // Animated background color
  const animatedStyle = useAnimatedStyle(() => ({
    backgroundColor: interpolateColor(
      progress.value,
      [0, 1],
      ['#016837', '#0F5837'], // Outlined to filled
    ),
    borderColor: '#0F5837',
    borderWidth: 2,
    transform: [{ scale: scale.value }],
  }));

  // Animated text color
  const animatedTextStyle = useAnimatedStyle(() => ({
    color: interpolateColor(progress.value, [0, 1], ['#FFFFFF', '#FFFFFF']),
    fontWeight: 'bold',
    fontSize: 20,
  }));

  // Animated icon style (scale/rotate for fun)
  const animatedIconStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: withTiming(saudiProductsMode ? 1.1 : 1, { duration: 300 }) },
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
    <Animated.View
      style={[{ borderRadius: 12, overflow: 'hidden' }, animatedStyle]}
    >
      <Pressable
        onPress={handleSaudiProductsModeToggle}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
          paddingVertical: 6,
        }}
        accessibilityRole="button"
      >
        <Animated.View style={animatedIconStyle}>
          {saudiProductsMode ? (
            <X color="#fff" size={28} />
          ) : (
            <Image
              source={require('../../assets/saudi-industries.jpeg')}
              style={{ width: 28, height: 28 }}
            />
          )}
        </Animated.View>
        <Animated.Text style={animatedTextStyle}>
          {saudiProductsMode ? 'إغلاق' : 'صناعة سعودية'}
        </Animated.Text>
      </Pressable>
    </Animated.View>
  );
};

export default HomeScreen;
