import { useQuery } from '@tanstack/react-query';
import { DriverTransformer, DriversService } from '@zix/api';
import { UserCard } from '@zix/features/users';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader, ScreenLayout } from '@zix/ui/layouts';
import { MapDriverMarker } from '@zix/ui/sawaeed';
import { t } from 'i18next';
import { useRef, useState } from 'react';
import { Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import { useRouter } from 'solito/router';
import { Button, YStack } from 'tamagui';

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

  const [showMap, setShowMap] = useState(false);
  const [search, setSearch] = useState<string>();
  const router = useRouter();
  const { data, ...driversQuery } = useQuery({
    queryFn() {
      return DriversService.fetchAllDrivers({
        perPage: 50,
        search,
      });
    },
    queryKey: ['DriversService.fetchAllDrivers', search],
  });
  const [selectedDriver, setSelectedDriver] = useState<DriverTransformer>();
  const flatListRef = useRef(null);


  const renderMap = () =>
  (
    <MapView
      provider="google"
      ref={mapRef}
      style={{ flex: 1 }}
      initialCamera={initialCamera}
    >
      {data?.data?.map((driver, index) => (
        <MapDriverMarker
          key={`marker-${index}`}
          driver={driver}
          isSelected={selectedDriver?.id === driver.id}
          onPress={() => {
            setSelectedDriver(driver);
            mapRef.current?.animateCamera({
              center: {
                latitude: parseFloat( driver?.live_location?.latitude || driver?.location?.latitude),
                longitude: parseFloat(driver?.live_location?.longitude || driver?.location?.longitude),
              },
              zoom: 11,
            });
            router.push(`/app/users/${driver.id}`);
          }}
        />

      ))}
    </MapView>
  );
  //List
  const renderList = () =>
  (showMap &&
    <YStack
      position='absolute'
      zIndex={2}
      width='100%'
      backgroundColor={'white'}
      height={height}
      left={0}
      paddingTop={70}
    >
      <FlatList
        refreshing={driversQuery.isFetching}
        onRefresh={driversQuery.refetch}
        ref={flatListRef}
        data={data?.data || []}
        showsVerticalScrollIndicator={false}
        renderItem={({ item, index }) => (
          <UserCard
            cursor='pointer'
            key={`stack-${item.id}-${index}`}
            user={item}
            borderWidth={selectedDriver?.id === item.id ? 4 : 0}
            borderColor={'$color8'}
            margin="$2"
            flex={1}
          />
        )}
      />
      {renderSwitcher()}
    </YStack>
  );

  //switch button Map / List
  const renderSwitcher = () => (
    <Button
      theme="accent"
      zIndex={1}
      position="absolute"
      bottom="$10"
      right={60}
      icon={<CustomIcon name={showMap ? 'list' : 'map'} size="$1" />}
      fontWeight="600"
      fontSize="$2"
      size="$4"
      onPress={() => setShowMap(!showMap)}
    />

  );


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
      {renderMap()}
      {renderList()}
      {renderSwitcher()}
    </ScreenLayout>
  );
}

export default HomeScreen;
