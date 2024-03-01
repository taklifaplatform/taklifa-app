import { TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { Button, XStack, YStack, Text, Stack, Input } from 'tamagui';
import { CustomIcon } from '@zix/ui/icons';
import { t } from 'i18next';
import { ButtonItem } from './ButtonItem';
import { useMultiLang } from '@zix/i18n';
import { ZixInput } from '@zix/ui/forms';

export function TrackShipments() {
  const [selectedShipment, setSelectedShipment] = useState(0);
  const { isRtl } = useMultiLang();

  const renderMethodShipment = () => (
    <XStack
      gap="$4"
      $sm={{
        width: '100%',
        justifyContent: 'center',
      }}
    >
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
            fontSize={20}
            $sm={{
              fontSize: 12,
            }}
          >
            {t('web-home:searchshipment')}
          </Text>
        </XStack>
      </TouchableOpacity>
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
            fontSize={20}
            $sm={{
              fontSize: 12,
            }}
          >
            {t('web-home:findshipment')}
          </Text>
        </XStack>
      </TouchableOpacity>
    </XStack>
  );

  const renderReferenceShipment = () => (
    <Stack width="70%" 
    $lg={{
      marginBottom: '$4',
    }}
    $md={{
      width: '100%',
      marginBottom: '$4',
    }}
    >
    <ZixInput
      fullWidth={true}
      placeholder={t('web-home:shipmentplaceholder')}
      leftIcon={(props) => <CustomIcon {...props} name="flip" />}
      
    />
    </Stack>
  );

  const renderButtonShipment = () => (
    <Stack
    flex={1}
      flexDirection="row"
      //flexWrap='wrap'
      justifyContent='center'
      gap="$4"
      $xs={{
        flexDirection: 'column',
        marginBottom: '$4',
      }}
    >
      <ButtonItem
        name={selectedShipment === 0 ? t('web-home:track') : t('web-home:send')}
        path="/"
        iconAfter={<CustomIcon name="large_arrow_right" size={'$1'} />}
        borderRadius="$4"
        paddingVertical="$4"
        paddingHorizontal="$6"
        width="100%"
        $sm={{
          width: '100%',
        }}
      />

      <ButtonItem
        name={
          selectedShipment === 0
            ? t('web-home:realtrack')
            : t('web-home:realsend')
        }
        path="/"
        iconAfter={<CustomIcon name="large_arrow_right" size={'$1'} />}
        backgroundColor="transparent"
        borderRadius="$4"
        borderWidth={1}
        paddingVertical="$4"
        paddingHorizontal="$6"
        borderColor="$gray10"
        width="100%"
      />
    </Stack>
  );
  return (
    <YStack
      alignItems="center"
      backgroundColor={'$color1'}
      borderRadius="$2"
      padding="$4"
      gap="$4"
      marginBottom="$4"
    >
      {renderMethodShipment()}

      <Stack
        w={'100%'}
        alignItems="center"
        justifyContent="space-evenly"
        flexDirection="row-reverse"
        flexWrap="wrap"
      >
        {renderReferenceShipment()}
        {renderButtonShipment()}
      </Stack>
    </YStack>
  );
}
