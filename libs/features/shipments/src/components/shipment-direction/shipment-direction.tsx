import { ShipmentTransformer } from '@zix/api';
import { useMultiLang } from '@zix/i18n';
import { CustomIcon } from '@zix/ui/icons';
import { ZixMapDirectionWidget, ZixWidgetContainer } from '@zix/ui/widgets';
import { t } from 'i18next';
import React from 'react';
import { Stack, Text, XStack, YStack } from 'tamagui';
import ShipmentCardLocation from '../shipment-card-location/shipment-card-location';

/* eslint-disable-next-line */
export interface ShipmentDirectionProps {
  shipment: ShipmentTransformer;
}

export const ShipmentDirection: React.FC<ShipmentDirectionProps> = ({
  shipment,
}) => {
  const { isRtl } = useMultiLang();
  return (
    <ZixWidgetContainer label={t('shipment:shipment-path')}>
      <Stack
        flex={1}
        flexDirection="column"
        gap="$4"
        $gtSm={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          borderRadius: '$4',
        }}
      >
        <YStack gap="$2" $gtSm={{ width: '50%' }}>
          <XStack theme='accent' gap="$2" alignItems="center">
            <CustomIcon
              name="assistant-navigation"
              size="$1.5"
              color='$color10'
              {...(!isRtl && { rotate: '180deg' })}
            />
            <Text fontSize={18} fontWeight='700' color='$color10'>
              {t('shipment:from_location')}
            </Text>
          </XStack>
          <ShipmentCardLocation
            location={shipment.from_location || {}}
            date={shipment.pick_date || ''}
            phone_number={shipment.user?.phone_number || ''}
            userName={shipment.user?.name || ''}
          />
        </YStack>
        <YStack gap="$2" $gtSm={{ width: '50%' }}>
          <XStack theme={shipment.status !== 'cancelled' ? 'error' : 'accent'} gap="$2" alignItems="center">
            <CustomIcon
              name="location"
              size="$1.5"
              color='$color1'
            />
            <Text
              fontSize={18}
              fontWeight='700'
              color='$color1'
            >
              {t('shipment:to_location')}
            </Text>
          </XStack>
         <ShipmentCardLocation
            location={shipment.to_location || {}}
            date={shipment.deliver_date || ''}
            phone_number={shipment.recipient_phone || ''}
            userName={shipment.recipient_name || ''}
            borderColor={shipment.status === 'cancelled' ? '$red9' : '$color1'}
            backgroundColor={
              shipment.status === 'cancelled'
                ? '$red3'
                : shipment.status === 'delivered'
                  ? '$color3'
                  : 'transparent'
            }
          />
        </YStack>
      </Stack>
    </ZixWidgetContainer>
  );
};

export default ShipmentDirection;
