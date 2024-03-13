import { t } from 'i18next';
import React from 'react';
import { XStack, YStack, Text, Image, View } from 'tamagui';

/* eslint-disable-next-line */
export interface ShipmentCodeProps {
  codeId: number | string;
}

export const ShipmentCode: React.FC<ShipmentCodeProps> = ({
  codeId,
  ...props
}) => {
  return (
    <YStack
      gap="$4"
      backgroundColor={'$color3'}
      padding="$4"
      alignItems="center"
      borderRadius={'$4'}
      {...props}
    >
      <XStack gap="$6" alignItems="center">
        <Text color={'$color'} fontSize={18} fontWeight={'600'}>
          {t('job:shipment-code')}
        </Text>
        <View width={150}>
          <Text fontSize={18} fontWeight={'600'} numberOfLines={1}>
            {codeId}
          </Text>
        </View>
      </XStack>
      <Image
        source={require('../../../../../../apps/mobile/assets/code.png')}
        width={200}
        height={200}
        resizeMode="contain"
      />
    </YStack>
  );
};

export default ShipmentCode;
