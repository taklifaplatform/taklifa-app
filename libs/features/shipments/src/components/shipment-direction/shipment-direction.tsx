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
  status: string;
}

export const ShipmentDirection: React.FC<ShipmentDirectionProps> = ({
  shipment,
  status,
}) => {
  const { isRtl } = useMultiLang();
  return (
    <ZixWidgetContainer label={t('shipment:shipment-path')}>
      <YStack gap="$3" backgroundColor={'$gray3'} $gtSm={{ backgroundColor: 'transparent'}}>
        <Stack
          flex={1}
          flexDirection="column"
          gap="$4"
          marginTop="$4"
          paddingHorizontal="$4"
          $gtSm={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            borderRadius: '$4',
          }}
        >
          <YStack gap="$4" $gtSm={{ width: '50%' }}>
            <XStack gap="$2" alignItems="center">
              <CustomIcon
                name="assistant-navigation"
                size="$1.5"
                color={'$color5'}
                {...(!isRtl && { rotate: '180deg' })}
              />
              <Text fontSize={18} fontWeight={600} color={'$color5'}>
                {t('shipment:from_location')}
              </Text>
            </XStack>
            <ShipmentCardLocation
              location={shipment.from_location || {}}
              date={shipment.pick_date || ''}
              phone_number={shipment.user?.phone_number || ''}
              userName={shipment.user?.name || ''}
              backgroundColor={status === 'draft' ? 'transparent' : '$color3'}
            />
          </YStack>
          <YStack gap="$4" $gtSm={{ width: '50%' }}>
            <XStack gap="$2" alignItems="center">
              <CustomIcon
                name="location"
                size="$1.5"
                color={status === 'cancelled' ? '$red9' : '$color5'}
              />
              <Text
                fontSize={18}
                fontWeight={600}
                color={status === 'cancelled' ? '$red9' : '$color5'}
              >
                {t('shipment:to_location')}
              </Text>
            </XStack>
            <ShipmentCardLocation
              location={shipment.to_location || {}}
              date={shipment.pick_date || ''}
              phone_number={shipment.recipient_phone || ''}
              userName={shipment.recipient_name || ''}
              borderColor={status === 'cancelled' ? '$red9' : '$gray9'}
              backgroundColor={
                status === 'cancelled'
                  ? '$red3'
                  : status === 'delivered'
                    ? '$color3'
                    : 'transparent'
              }
            />
          </YStack>
        </Stack>
        <Stack >
          <ZixMapDirectionWidget
            startLocation={shipment.from_location || {}}
            endLocation={shipment.to_location || {}}
            status={status}
          />
        </Stack>
      </YStack>
    </ZixWidgetContainer>
  );
};

export default ShipmentDirection;
