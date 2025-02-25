import React, { useEffect, useState } from 'react';

import { Search, X } from '@tamagui/lucide-icons';
import { useToastController } from '@tamagui/toast';
import { GeographyService, LocationTransformer } from '@zix/api';
import { ZixButton, ZixMapMarker } from '@zix/ui/common';
import { CustomIcon } from '@zix/ui/icons';
import { useSafeAreaInsets } from '@zix/utils';
import { t } from 'i18next';
import { ActivityIndicator, FlatList, Platform } from 'react-native';
import {
  Avatar,
  Button,
  H4,
  ListItem,
  Sheet,
  Spinner,
  Text,
  Theme,
  View,
  XStack,
  YStack,
} from 'tamagui';
import { useDebounce } from 'use-debounce';
import { ZixFieldContainer } from '../../common';
import { ZixInput } from '..';
import ZixMapPointerField from '../zix-map-pointer-field/zix-map-pointer-field';
import MapView from 'react-native-maps';
import { AppLayout } from '@zix/ui/layouts';
import { useThemeSetting } from '@zix/providers';

export type ZixMapLocationPickerFieldProps = {
  value: LocationTransformer;
  onChange: (val: LocationTransformer) => void;
};

type ZixMapLocationPickerFieldHeaderProps = {
  onChange: (props: any) => void;
  onClose: () => void;
};

const ZixMapLocationPickerFieldHeader: React.FC<ZixMapLocationPickerFieldHeaderProps> = ({
  onChange,
  onClose,
}) => {
  const { top } = useSafeAreaInsets();
  const toast = useToastController();

  const [search, setSearch] = useState<string>();
  const [debouncedSearchValue] = useDebounce(search, 1000);
  const [searching, setSearching] = useState(false)


  const [results, setResults] = useState<any[]>([])
  const fetchData = async (address: string) => {
    setSearching(true)
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`,
      ).then((response) => response.json())
      if (response?.status === 'OK') {
        setResults(response.results)
      }
    } catch (error) {
      toast.show(t('app:errors.something-went-wrong'), { preset: 'error' })
    }
    setSearching(false);
  }

  useEffect(() => {
    if (debouncedSearchValue) {
      fetchData(debouncedSearchValue)
    } else {
      setSearching(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchValue]);

  function onSelectSearchResult(item: any) {
    setSearch('');
    const { lat, lng } = item.geometry.location;
    onChange({
      latitude: lat,
      longitude: lng,
    });
  }

  const renderMapSearchResults = () => (
    <FlatList
      data={search ? results : []}
      renderItem={({ item, index }) => (
        <ListItem
          key={`${item.place_id}-${index}`}
          onPress={() => onSelectSearchResult(item)}
          icon={
            <Avatar
              size="$4"
              circular
              backgroundColor="$color2"
              alignItems="center"
              justifyContent="center"
            >
              <Theme name="accent">
                <CustomIcon name="location" size="$2" color="$color10" />
              </Theme>
            </Avatar>
          }
          title={
            item?.address_components?.find((component: any) =>
              component.types.includes('country'),
            )?.long_name
          }
          subTitle={item?.formatted_address}
          marginBottom="$2"
        />
      )}
    />
  );

  return (
    <View
      position="absolute"
      paddingTop={top}
      top={0}
      left={0}
      right={0}
      backgroundColor={search?.length ? '$color1' : 'transparent'}
    >
      <XStack padding="$4" gap="$4">
        <ZixInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search here"
          leftIcon={() => (
            <Theme name="accent">
              <Search size="$1.5" color="$color10" />
            </Theme>
          )}
          rightIcon={() => searching && <Spinner size="small" color="$green10" />}
          containerProps={{
            flex: 1,
          }}
        />
        <Button
          icon={X}
          size="$5"
          backgroundColor="$color2"
          scaleIcon={1.5}
          onPress={onClose}
        />
      </XStack>
      {renderMapSearchResults()}
    </View>
  );
};

export const ZixMapLocationPickerFieldContent: React.FC<ZixMapLocationPickerFieldProps> = ({
  value,
  onChange,
  onClose,
}) => {
  const { bottom } = useSafeAreaInsets();
  const [localLocation, setLocalLocation] = useState<LocationTransformer>(
    {
      ...value
    }
  )
  const [isPending, setIsPending] = useState(false);

  async function mutate({ latitude, longitude }: LocationTransformer) {
    setIsPending(true);
    try {
      const { results } = await fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBw3sZh4uFyLbi9sKTzKYn3BqIS_b-vGeA`,
      )
        .then((response) => response.json())
        .then(({ results }) => ({ results, latitude, longitude }));
      const result = results[0];
      console.log("=====")
      console.log("results::", JSON.stringify(result, null, 2))
      console.log("=====")

      let country_id: any = localLocation?.country_id;
      let city_id: any = localLocation?.city_id;

      const postcode =
        result?.address_components?.find((component: any) =>
          component.types.includes('postal_code'),
        )?.long_name || localLocation?.postcode;
      const countryName = result?.address_components?.find((component: any) =>
        component.types.includes('country'),
      )?.long_name;
      const cityName = result?.address_components?.find((component: any) =>
        component.types.includes('locality'),
      )?.long_name;

      if (countryName) {
        const countryData = await GeographyService.listCountries({
          search: countryName,
        });

        if (countryData?.data?.length) {
          country_id = countryData.data[0].id;
        } else {
          country_id = null;
        }
      } else {
        country_id = null;
      }

      if (cityName) {
        const cityData = await GeographyService.fetchCities({
          search: cityName,
        });

        if (cityData?.data?.length) {
          city_id = cityData.data[0].id;
        } else {
          city_id = null;
        }
      } else {
        city_id = null;
      }

      setLocalLocation({
        ...localLocation,
        latitude,
        longitude,
        country_id,
        city_id,
        postcode,
        address: result?.formatted_address,
      });
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsPending(false);
    }
  }

  const renderAddressConfirmation = () =>
    !!localLocation?.address && (
      <YStack
        paddingBottom={Platform.OS === 'web' ? '$8' : bottom}
        padding={Platform.OS === 'web' ? '$8' : '$4'}
        gap="$4"
        backgroundColor="$color1"
      >
        <H4>{t('common:address')}</H4>
        <Text>{localLocation?.address}</Text>
        <Theme inverse>
          <ZixButton loading={isPending} onPress={() => {
            onChange(localLocation);
            onClose();
          }}>
            {t('common:confirm')}
          </ZixButton>
        </Theme>
      </YStack>
    );

  const renderMapAddressPickerLayout = () => (
    <>
      <ZixMapPointerField
        value={localLocation || {}}
        onChange={(location) => {
          setLocalLocation({
            ...value,
            ...localLocation,
            ...location,
          });
          mutate(location);
        }}
      />
      <ZixMapLocationPickerFieldHeader
        onChange={mutate}
        onClose={() => onClose(false)}
      />
      {isPending ?
        <View flex={1}
          position='absolute'
          top={0}
          left={0}
          right={0}
          bottom={0}
        >
          <ActivityIndicator
            size="large"
            color="black"
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
          />
        </View>
        :
        renderAddressConfirmation()}
    </>
  )

  return (
    <View flex={1} backgroundColor="$background1">
      {
        Platform.OS === 'web' ?
          <AppLayout>
            {renderMapAddressPickerLayout()}
          </AppLayout>
          : renderMapAddressPickerLayout()
      }
    </View>
  );
};

export const ZixMapLocationPickerField: React.FC<ZixMapLocationPickerFieldProps> = ({
  value,
  onChange,
}) => {
  const [open, setOpen] = useState(false);
  const [localLocation, setLocalLocation] = useState(value)
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

  return (
    <>
      <View position="relative">
        <ZixFieldContainer label={t('common:select-location-on-map')} labelBold>
          <View height="$15">
            <MapView
              key={`map-${localLocation?.latitude}-${localLocation?.longitude}`}
              style={{ flex: 1, height: 200, borderRadius: 14 }}
              customMapStyle={current === 'dark' ? darkMapStyle : []}
              provider='google'
              initialRegion={{
                latitude: localLocation?.latitude || 24.713552,
                longitude: localLocation?.longitude || 46.675296,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
            >
              <ZixMapMarker location={localLocation} />
            </MapView>
          </View>
        </ZixFieldContainer>
        <View
          onPress={() => setOpen(true)}
          position="absolute"
          top={0}
          right={0}
          bottom={0}
          left={0}
        />
      </View>

      <Sheet
        open={open}
        onOpenChange={setOpen}
        modal
        native
        snapPoints={[100, 100]}
        dismissOnSnapToBottom={false}
        forceRemoveScrollEnabled
        disableDrag
      >
        <Sheet.Frame>
          <ZixMapLocationPickerFieldContent
            value={value}
            onChange={(val) => {
              setLocalLocation(val)
              onChange(val)
              setOpen(false)
            }}
            onClose={() => setOpen(false)}
          />
        </Sheet.Frame>
      </Sheet>
    </>
  );
};

export default ZixMapLocationPickerField
