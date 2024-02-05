import { TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Button, XStack, YStack, Text } from '@zix/app/ui/core';
import { CustomIcon } from '@zix/app/ui/icons';
import { t } from 'i18next';
export function TrackShipments() {
  const [selectedShipment, setSelectedShipment] = useState(0);
  return (
    <YStack
      w={'100%'}
      alignItems="center"
      backgroundColor={'$color1'}
      borderRadius="$2"
      padding="$4"
      space="$4"
      marginTop="$2"
    >
      <XStack space="$4">
        <TouchableOpacity onPress={() => setSelectedShipment(0)}>
          <XStack
            alignItems="center"
            space="$2"
            borderBottomWidth={selectedShipment === 0 ? 2 : 0}
            borderColor="$color5"
            paddingBottom="$2"
          >
            <CustomIcon
              name="findtrack"
              color={selectedShipment === 0 ? null : '$gray9'}
            />
            <Text color={selectedShipment === 0 ? null : '$gray9'}>
            {t('web-home:findshipment')}
            </Text>
          </XStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedShipment(1)}>
          <XStack
            alignItems="center"
            space="$2"
            borderBottomWidth={selectedShipment === 1 ? 2 : 0}
            borderColor="$color5"
            paddingBottom="$2"
          >
            <CustomIcon
              name="searchtrack"
              color={selectedShipment === 1 ? null : '$gray9'}
            />
            <Text color={selectedShipment === 1 ? null : '$gray9'}>
            {t('web-home:searchshipment')}
            </Text>
          </XStack>
        </TouchableOpacity>
      </XStack>
      <XStack w={'100%'} alignItems="center" justifyContent="space-evenly">
        <XStack
          w={'65%'}
          padding="$3"
          borderWidth={1}
          borderRadius="$4"
          borderColor="$gray7"
        >
          <CustomIcon name="flip" />
          <TextInput
            placeholder={t('web-home:shipmentplaceholder')}
            style={{
              width: '100%',
              paddingLeft: 10
            }}
          />
        </XStack>
        <Button
          backgroundColor="$color5"
          borderRadius="$4"
          padding="$2"
          icon={<CustomIcon name="large_arrow_left" />}
          w={'13%'}
        >
          <Text color="$black">{t('web-home:track')}</Text>
        </Button>
        <Button
          backgroundColor="transparent"
          borderRadius="$4"
          padding="$2"
          icon={<CustomIcon name="large_arrow_left" />}
          w={'13%'}
          borderWidth={1}
          borderColor="$gray10"
        >
          <Text color="$black">{t('web-home:realtrack')}</Text>
        </Button>
      </XStack>
    </YStack>
  );
}
