import React, { useState } from 'react';

import { LocateFixed } from '@tamagui/lucide-icons';
import { GeographyService, LocationTransformer } from '@zix/api';
import { useSafeAreaInsets } from '@zix/utils';
import { H4, Sheet, Text, Theme, View, YStack } from 'tamagui';
import { SubmitButton, ZixFieldContainer } from '../../common';
import { ZixInput } from '../../fields';
import ZixMapPointerField from '../../fields/zix-map-pointer-field/zix-map-pointer-field';

export type MapLocationPickerProps = {
  value: LocationTransformer
  onChange: (val: LocationTransformer) => void
}


export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)
  const { bottom } = useSafeAreaInsets()

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
        {/* <Sheet.Overlay /> */}
        <Sheet.Frame>
          <View flex={1} paddingBottom={bottom} backgroundColor='$background1'>
            <ZixMapPointerField
              value={value}
              onChange={onLocationChange}
            />

            <YStack padding='$4' paddingBottom='0' gap='$4'>
              <H4>Address</H4>
              <Text>{value?.address}</Text>
              <Theme inverse>
                <SubmitButton onPress={() => setOpen(false)}>
                  Confirm Location
                </SubmitButton>
              </Theme>
            </YStack>
          </View>
        </Sheet.Frame>
      </Sheet>
    </>
  );
}
