import React, { useState } from 'react';

import { Search, X } from '@tamagui/lucide-icons';
import { useMutation, useQuery } from '@tanstack/react-query';
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

type MapLocationPickerHeaderProps = {
  onChange: (props: any) => void
  onClose: () => void
}

const MapLocationPickerHeader: React.FC<MapLocationPickerHeaderProps> = ({ onChange, onClose }) => {
  const { top } = useSafeAreaInsets()

  const [search, setSearch] = useState<string>()

  /**
   * Search Google Map Location
   */
  const { data } = useQuery({
    queryKey: ['search-location', search],
    queryFn: () => {
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
        .then(response => response.json())
    }
  })

  function onSelectSearchResult(item: any) {
    console.log('onSelectSearchResult', item)
    setSearch('')
    const { lat, lng } = item.geometry.location
    onChange({
      latitude: lat,
      longitude: lng,
    })
  }


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
          onPress={onClose}
        />
      </XStack>
      {renderMapSearchResults()}
    </View>
  )
}


export const MapLocationPicker: React.FC<MapLocationPickerProps> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false)

  const { bottom } = useSafeAreaInsets()

  const { mutate, isPending } = useMutation({
    mutationFn({ latitude, longitude }: LocationTransformer) {
      return fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}`)
        .then(response => response.json())
        .then(({ results }) => ({ results, latitude, longitude }))
    },
    onSuccess: async ({ results, latitude, longitude }) => {
      const result = results[0]
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
        } else {
          country_id = null
        }
      } else {
        country_id = null
      }

      if (cityName) {
        const cityData = await GeographyService.fetchCities({
          search: cityName
        })

        if (cityData?.data?.length) {
          city_id = cityData.data[0].id
        } else {
          city_id = null
        }
      } else {
        city_id = null
      }

      console.log('===========')
      console.log('SELECTED LOCATION::', JSON.stringify({
        ...value,
        latitude,
        longitude,
        country_id,
        city_id,
        postcode,
        address: results[0].formatted_address
      }, null, 2))
      console.log('===========')
      onChange({
        ...value,
        latitude,
        longitude,
        country_id,
        city_id,
        postcode,
        address: results[0].formatted_address
      })
    }

  })


  const renderAddressConfirmation = () => !!value?.address && (
    <YStack padding='$4' paddingBottom={bottom} gap='$4' backgroundColor='$color1'>
      <H4>Address</H4>
      <Text>{value?.address}</Text>
      <Theme inverse>
        <SubmitButton isLoading={isPending} onPress={() => setOpen(false)}>
          Confirm Location
        </SubmitButton>
      </Theme>
    </YStack>
  )

  const renderSheet = () => (
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
            onChange={mutate}
          />
          <MapLocationPickerHeader onChange={mutate} onClose={() => setOpen(false)} />

          {renderAddressConfirmation()}
        </View>
      </Sheet.Frame>
    </Sheet>
  )

  return (
    <>
      <View position='relative'>
        <ZixFieldContainer
          label='Please select location on map'
          labelBold
        >
          <View height='$15'>
            <ZixMapPointerField
              value={value}
            />
          </View>
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

      {renderSheet()}
    </>
  );
}
