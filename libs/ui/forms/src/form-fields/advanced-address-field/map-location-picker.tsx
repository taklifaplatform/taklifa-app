import React, { useEffect, useState } from 'react';

import { LocateFixed, Search, X } from '@tamagui/lucide-icons';
import { useQuery } from '@tanstack/react-query';
import { GeographyService, LocationTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import { useSafeAreaInsets } from '@zix/utils';
import { FlatList } from 'react-native';
import { Avatar, Button, H4, ListItem, Sheet, Text, Theme, View, XStack, YStack } from 'tamagui';
import { SubmitButton, ZixFieldContainer } from '../../common';
import { ZixInput } from '../../fields';
import ZixMapPointerField from '../../fields/zix-map-pointer-field/zix-map-pointer-field';

export type MapLocationPickerProps = {
  value: LocationTransformer
  onChange: (val: LocationTransformer) => void
}


export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({ value, onChange }) => {

  const [open, setOpen] = useState(false)
  const { bottom, top } = useSafeAreaInsets()

  const [search, setSearch] = useState<string>()

  /**
   * Search Google Map Location
   */
  const { data } = useQuery({
    queryKey: ['search-location', search],
    queryFn: () => {
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=AIzaSyBw3sZh4uFyLbi9sKTzKYn3BqIS_b-vGeA`)
        .then(response => response.json())
    }
  })

  useEffect(() => {
    console.log('=============')
    console.log('RESULTS::', JSON.stringify(data?.results, null, 2))
    console.log('=============')
  }, [data?.results])

  const onLocationChange = ({ latitude, longitude }: LocationTransformer) => {
    console.log('latitude', latitude, 'longitude', longitude)

    // convert geolocation to google map address
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
    // https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY
    fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=AIzaSyBw3sZh4uFyLbi9sKTzKYn3BqIS_b-vGeA`)
      .then(response => response.json())
      .then(async data => {
        const result = data.results[0]
        let country_id: any = value?.country_id;
        let city_id: any = value?.city_id;

        const postcode = result.address_components.find((component: any) => component.types.includes('postal_code'))?.long_name || value?.postcode
        const countryName = result.address_components.find((component: any) => component.types.includes('country'))?.long_name
        const cityName = result.address_components.find((component: any) => component.types.includes('locality'))?.long_name

        if (countryName) {
          const countryData = await GeographyService.listCountries({
            search: countryName
          })

          if (countryData?.data?.length) {
            country_id = countryData.data[0].id
          }
        }

        if (cityName) {
          const cityData = await GeographyService.fetchCities({
            search: cityName
          })

          if (cityData?.data?.length) {
            city_id = cityData.data[0].id
          }
        }

        console.log('===========')
        console.log(JSON.stringify(data.results[0], null, 2))
        console.log('===========')
        onChange({
          ...value,
          latitude,
          longitude,
          country_id,
          city_id,
          postcode,
          address: data.results[0].formatted_address
        })
      })

    onChange({
      latitude,
      longitude,
    })
  }

  function onSelectSearchResult(item: any) {
    console.log('onSelectSearchResult', item)
    setSearch('')
    const { lat, lng } = item.geometry.location
    onLocationChange({
      latitude: lat,
      longitude: lng,
    })
  }

  const renderAddressConfirmation = () => !!value?.address && (
    <YStack padding='$4' paddingBottom={bottom} gap='$4' backgroundColor='$color1'>
      <H4>Address</H4>
      <Text>{value?.address}</Text>
      <Theme inverse>
        <SubmitButton onPress={() => setOpen(false)}>
          Confirm Location
        </SubmitButton>
      </Theme>
    </YStack>
  )


  const renderMapSearch = () => (
    <View
      position='absolute'
      paddingTop={top}
      top={0}
      left={0}
      right={0}
      backgroundColor={search?.length ? '$color1' : 'transparent'}
    >
      <XStack padding='$4' gap='$4'>
        <ZixInput
          value={search}
          onChangeText={setSearch}
          placeholder='Search here'
          leftIcon={() => (
            <Theme name='accent'>
              <Search size="$1.5" color='$color10' />
            </Theme>
          )}
          containerProps={{
            flex: 1,
          }}
        />
        <Button
          icon={X}
          size='$5'
          backgroundColor='$color2'
          scaleIcon={1.5}
          onPress={() => setOpen(false)}
        />
      </XStack>
      {renderMapSearchResults()}
    </View>
  )
  const renderMapSearchResults = () => (
    <FlatList
      data={data?.results}
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
              <Theme name='accent'>
                <CustomIcon name='location' size="$2" color='$color10' />
              </Theme>
            </Avatar>
          }
          title={
            item.address_components?.find((component: any) => component.types.includes('country'))?.long_name
          }
          subTitle={item.formatted_address}
          marginBottom='$2'
        />
      )}
    />
  )

  return (
    <>
      <View position='relative'>
        <ZixFieldContainer
          label='Please Enter your detailed Address'
        >
          <ZixInput
            rightIcon={(props) => <LocateFixed {...props} />}
            placeholder='Enter your address'
            value={value?.address}
          />
        </ZixFieldContainer>
        <View
          onPress={() => setOpen(true)}
          position='absolute'
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
          <View flex={1} backgroundColor='$background1'>
            <ZixMapPointerField
              value={value}
              onChange={onLocationChange}
            />
            {renderMapSearch()}


            {renderAddressConfirmation()}
          </View>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
