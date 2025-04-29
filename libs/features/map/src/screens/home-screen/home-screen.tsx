import { X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { CompaniesService, DriverTransformer, DriversService } from '@zix/api';
import { UserCard } from '@zix/features/users';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { MapCompanyMarker, MapDriverMarker } from '@zix/ui/sawaeed';
import { t } from 'i18next';
import { useMemo, useRef, useState } from 'react';
import { Dimensions, Platform } from 'react-native';
import MapView from 'react-native-maps';
import { useRouter } from 'solito/router';
import { Button, View, XStack, YStack } from 'tamagui';
import MapFilters from '../../components/map-filters/map-filters';
import { useAuth } from '@zix/services/auth';
import { useThemeSetting } from '@zix/providers';

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
  const mapRef = useRef<MapView>(null);
  const GOOGLE_MAPS_APIKEY = 'AIzaSyBw3sZh4uFyLbi9sKTzKYn3BqIS_b-vGeA';
  const [showMap, setShowMap] = useState(false);
  const [search, setSearch] = useState<string>();
  const { isLoggedIn } = useAuth();
  const [filters, setFilters] = useState({
    vehicle_model: 'all',
    provider_type: 'all',
  })
  const filtersKey = useMemo(() => Object.values(filters).join('-'), [filters]);
  const router = useRouter();

  const { data, ...driversQuery } = useQuery({
    queryFn() {
      return DriversService.fetchAllDrivers({
        perPage: 50,
        vehicleModel: filters.vehicle_model,
        search,
      });
    },
    queryKey: ['DriversService.fetchAllDrivers', filtersKey, search],
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


  const renderMapCompanies = () =>

    companiesQuery.data?.data?.map((company, index) => (
      <MapCompanyMarker
        key={`marker-${index}`}
        company={company}
        onPress={() => {
          if (isLoggedIn) {
            router.push(`/app/companies/${company.id}`);
          } else {
            alert('Please login to view details');
            router.push(`/auth/login`);
          }
        }}
      />
    ));


  // DARK Map Style
  const { current } = useThemeSetting();
  const darkMapStyle = [
    {
      "elementType": "geometry",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "elementType": "labels.icon",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#212121" }]
    },
    {
      "featureType": "administrative",
      "elementType": "geometry",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "administrative.country",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#9e9e9e" }]
    },
    {
      "featureType": "administrative.land_parcel",
      "stylers": [{ "visibility": "off" }]
    },
    {
      "featureType": "administrative.locality",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#bdbdbd" }]
    },
    {
      "featureType": "poi",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "geometry",
      "stylers": [{ "color": "#181818" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#616161" }]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels.text.stroke",
      "stylers": [{ "color": "#1b1b1b" }]
    },
    {
      "featureType": "road",
      "elementType": "geometry.fill",
      "stylers": [{ "color": "#2c2c2c" }]
    },
    {
      "featureType": "road",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#8a8a8a" }]
    },
    {
      "featureType": "road.arterial",
      "elementType": "geometry",
      "stylers": [{ "color": "#373737" }]
    },
    {
      "featureType": "road.highway",
      "elementType": "geometry",
      "stylers": [{ "color": "#3c3c3c" }]
    },
    {
      "featureType": "road.highway.controlled_access",
      "elementType": "geometry",
      "stylers": [{ "color": "#4e4e4e" }]
    },
    {
      "featureType": "road.local",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#616161" }]
    },
    {
      "featureType": "transit",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#757575" }]
    },
    {
      "featureType": "water",
      "elementType": "geometry",
      "stylers": [{ "color": "#000000" }]
    },
    {
      "featureType": "water",
      "elementType": "labels.text.fill",
      "stylers": [{ "color": "#3d3d3d" }]
    }
  ];

  const renderMap = () =>
  (
    <MapView
      provider="google"
      ref={mapRef}
      style={{ flex: 1 }}
      initialCamera={initialCamera}
      toolbarEnabled={false}
      showsUserLocation
      zoomControlEnabled={false}
      showsCompass={false}
      showsMyLocationButton={false}
      rotateEnabled={false}
      pitchEnabled={false}
      showsScale={false}
      showsTraffic={false}
      customMapStyle={current === 'dark' ? darkMapStyle : []}
      key={GOOGLE_MAPS_APIKEY}

    >
      {renderFilters()}
      {renderMapCompanies()}
      {data?.data?.map((driver, index) => (
        <MapDriverMarker
          key={`marker-${index}`}
          driver={driver}
          isSelected={selectedDriver?.id === driver.id}
          onPress={() => {
            setSelectedDriver(driver);
            mapRef.current?.animateCamera({
              center: {
                latitude: parseFloat(driver?.live_location?.latitude || driver?.location?.latitude),
                longitude: parseFloat(driver?.live_location?.longitude || driver?.location?.longitude),
              },
              zoom: 11,
            });
          }}
        />

      ))}
    </MapView>
  );

  //List
  const renderList = () =>
    showMap && (
      <YStack
        position="absolute"
        zIndex={2}
        width="100%"
        backgroundColor="$color2"
        height={height}
        left={0}
        paddingTop='$17'
      >
        <XStack
          flexWrap="wrap"
          justifyContent="center"
          padding="$2"
        >
          {data?.data?.map((item, index) => (
            <UserCard
              key={`stack-${item.id}-${index}`}
              user={item}
              borderWidth={selectedDriver?.id === item.id ? 4 : 0}
              borderColor="$color8"
              margin="$4"
              //flexBasis="30%" // Adjust for responsiveness
              minWidth={400}
              $sm={{
                width: '100%'
              }}
            />
          ))}
        </XStack>
        {renderSwitcher()}
      </YStack>
    );


  //switch button Map / List
  const renderSwitcher = () => (
    <Button
      theme="accent"
      position="absolute"
      bottom="8%"
      left={'44%'}
      $sm={{
        bottom: '10%',
        left: 13,
      }}
      icon={<CustomIcon name={showMap ? 'list' : 'map'} size="$2" />}
      fontWeight="600"
      fontSize="$3"
      size="$4"
      onPress={() => setShowMap(!showMap)}
    >
      {showMap ? t('common:list') : t('common:map')}
    </Button>

  );


  // Driver & company CARD
  const renderSelectedMarker = () => (
    <YStack
      flex={1}
      width='100%'
      alignItems='center'
      justifyContent='center'
      position='absolute'
      bottom={'40%'}
      padding='$2'
      $sm={{
        bottom: '10%',
      }}
    >
      <YStack
        minWidth={450}
        justifyContent='center'
      >
        <Button
          theme='accent'
          onPress={() => setSelectedDriver(undefined)}
          height={40}
          borderRadius='100%'
          padding='$2'
          width={40}

        >
          <X size={20} />
        </Button>
        <UserCard user={selectedDriver} />
      </YStack>

    </YStack>
  )


  // Filters
  const renderFilters = () => (
    <View
      theme={'accent'}
      justifyContent='center'
      position='absolute'
      zIndex={3}
      width='99%'
      left={-10}
      $sm={{
        top: '15%',
        maxWidth: 1100
      }}
    >
      <MapFilters values={filters} onChange={setFilters} />
    </View>
  )


  return (
    <ScreenLayout>
      <AppHeader
        title={t('navigation:customer-dashboard.home')}
        showSearchBar
        searchProps={{
          value: search,
          onChangeText: setSearch,
        }}
      />
      <YStack
        width='100%'
        flex={1}
        padding="$4"
      >
        {renderMap()}
      </YStack>
      {renderList()}
      {renderSwitcher()}
      {selectedDriver && renderSelectedMarker()}
    </ScreenLayout>
  );
}

export default HomeScreen;
