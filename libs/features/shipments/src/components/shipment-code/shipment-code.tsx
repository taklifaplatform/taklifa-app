import { t } from 'i18next';
import React from 'react';
import { Stack, Text, ThemeableStackProps, View, XStack, YStack } from 'tamagui';
import { CustomQRCode } from './custom-qr-code';

export type ShipmentCodeProps = ThemeableStackProps & {
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
          {t('shipment:shipment-code')}
        </Text>
        <View width={150}>
          <Text fontSize={18} fontWeight={'600'} numberOfLines={1}>
            {codeId} {' '}
          </Text>
        </View>
      </XStack>
      <Stack padding="$3" backgroundColor={'white'} borderRadius={'$2'}>
        {!!codeId && <CustomQRCode value={String(codeId)} size={200} />}
      </Stack>
    </YStack>
  );
};

export default ShipmentCode;
