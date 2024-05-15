
import { useQuery } from '@tanstack/react-query';
import { DriversService, ShipmentTransformer } from '@zix/api';
import { UserInfoRow } from '@zix/features/users';
import { UserAvatar } from '@zix/ui/common';
import React, { useMemo } from 'react';

import { Text, XStack, YStack } from 'tamagui';

export type ShipmentManagerPreSelectedDriverProps = {
  shipment: ShipmentTransformer;
}

export const ShipmentManagerPreSelectedDriver: React.FC<ShipmentManagerPreSelectedDriverProps> = ({
  shipment
}) => {
  const { data } = useQuery({
    queryFn: () => DriversService.retrieveDriver({
      driver: shipment.selected_driver_id
    }),
    queryKey: ['DriversService.retrieveDriver', shipment.selected_driver_id]
  })

  const user = data?.data

  const activeCompany = useMemo(() => {
    return user?.companies?.filter((company) => company?.logo?.url).shift();
  }, [user?.companies]);

  if (!user && shipment.selected_driver_id) {
    return (
      <XStack backgroundColor='$color2' height='$8' padding='$4' borderRadius='$4'></XStack>
    )
  }

  if (!user) {
    return null
  }

  return (
    <XStack backgroundColor='$color2' padding='$4' borderRadius='$4'>
      <XStack gap='$4' alignItems='center'>
        <UserAvatar size='$5' user={user} />
        <YStack gap='$2'>
          <Text color='$color12' fontWeight="bold">
            {user?.name}
          </Text>
          {activeCompany && (
            <Text color='$color11'>
              {activeCompany?.name}
            </Text>
          )}
          <UserInfoRow user={user} gap='$2' />
        </YStack>
      </XStack>
    </XStack>
  );
}


export default ShipmentManagerPreSelectedDriver;
