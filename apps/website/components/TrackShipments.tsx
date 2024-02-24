import { TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Button, XStack, YStack, Text, Stack } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
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
      gap="$4"
      marginTop="$2"
    >
      <XStack
        gap="$4"
        $sm={{
          width: '100%',
          justifyContent: 'space-between',
        }}
      >
        <TouchableOpacity onPress={() => setSelectedShipment(0)}>
          <XStack
            alignItems="center"
            gap="$2"
            borderBottomWidth={selectedShipment === 0 ? 2 : 0}
            borderColor="$color5"
            paddingBottom="$2"
          >
            <CustomIcon
              name="findtrack"
              color={selectedShipment === 0 ? null : '$gray9'}
            />
            <Text
              color={selectedShipment === 0 ? null : '$gray9'}
              $sm={{
                fontSize: '$3',
              }}
            >
              {t('web-home:findshipment')}
            </Text>
          </XStack>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setSelectedShipment(1)}>
          <XStack
            alignItems="center"
            gap="$2"
            borderBottomWidth={selectedShipment === 1 ? 2 : 0}
            borderColor="$color5"
            paddingBottom="$2"
          >
            <CustomIcon
              name="searchtrack"
              color={selectedShipment === 1 ? null : '$gray9'}
            />
            <Text
              color={selectedShipment === 1 ? null : '$gray9'}
              $sm={{
                fontSize: '$3',
              }}
            >
              {t('web-home:searchshipment')}
            </Text>
          </XStack>
        </TouchableOpacity>
      </XStack>
      <Stack
        w={'100%'}
        alignItems="center"
        justifyContent="space-evenly"
        flexDirection="row"
        $sm={{
          flexDirection: 'column',
        }}
      >
        <XStack
          w={'65%'}
          $sm={{
            w: '100%',
          }}
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
              paddingLeft: 10,
            }}
          />
        </XStack>

        <Stack
          flexDirection="row"
          gap="$4"
          $sm={{
            flexDirection: 'row',
            width: '100%',
            justifyContent: 'center',
            gap: '$4',
            marginVertical: '$4',
          }}
        >
          <Button
            backgroundColor="$color5"
            borderRadius="$4"
            padding="$2"
            $sm={{
              width: '46%',
            }}
            icon={<CustomIcon name="large_arrow_left" />}
          >
            <Text color="$black">{t('web-home:track')}</Text>
          </Button>
          <Button
            backgroundColor="transparent"
            borderRadius="$4"
            padding="$2"
            $sm={{
              width: '46%',
            }}
            icon={<CustomIcon name="large_arrow_left" />}
            borderWidth={1}
            borderColor="$gray10"
          >
            <Text color="$black">{t('web-home:realtrack')}</Text>
          </Button>
        </Stack>
      </Stack>
    </YStack>
  );
}
