import { useQuery } from '@tanstack/react-query';
import { DriverTransformer, DriversService } from '@zix/api';
import { UserCard } from '@zix/features/users';
import { CustomIcon } from '@zix/ui/icons';
import { AppHeader } from '@zix/ui/layouts';
import { MapDriverMarker } from '@zix/ui/sawaeed';
import { t } from 'i18next';
import { useRef, useState } from 'react';
import { FlatList } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';
import { Button, Stack, useStyle } from 'tamagui';

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
  const mapRef = useRef<MapView>(null);

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
  const [selectedDriver, setSelectedDriver] = useState<DriverTransformer>();

  const renderMap = () =>
    showMap && (
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
            }}
          />
        ))}
      </MapView>
    );
  //List
  const listStyle = useStyle({
    flex: '1',
    padding: '$2',
  });
  const renderList = () =>
    !showMap && (
      <FlatList
        refreshing={driversQuery.isFetching}
        onRefresh={driversQuery.refetch}
        style={listStyle}
        data={data?.data || []}
        numColumns={3}
        renderItem={({ item, index }) => (
          <Stack $gtSm={{ flex: 1, flexBasis: 1 }}>
            <UserCard
              key={`stack-${item.id}-${index}`}
              user={item}
              margin="$2"
              flex={1}
            />
          </Stack>
        )}
      />
    );

  //switch button Map / List
  const renderSwitcher = () => (
    <Button
      theme="accent"
      zIndex={300}
      position="fixed"
      bottom="$8"
      right="$8"
      icon={<CustomIcon name={showMap ? 'list' : 'map'} size="$2" />}
      fontWeight="600"
      fontSize="$2"
      size="$4"
      onPress={() => setShowMap(!showMap)}
    >
      {showMap ? 'القائمة' : 'الخريطة'}
    </Button>
  );

  return (
    <>
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
    </>
  );
}

export default HomeScreen;
