
import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';

import { Separator, Text, XStack } from 'tamagui';

export type DriverStatsRowProps = {
  driver: DriverTransformer
}

export const DriverStatsRow: React.FC<DriverStatsRowProps> = ({
  driver
}) => {
  return (
    <XStack justifyContent="space-between">
      <XStack alignItems="center" gap="$2">
        <CustomIcon name="car" size={15} color="$color5" />
        <Text color={'$black'} fontWeight="600" fontSize="$1">
          {driver?.vehicle?.plate_number}
        </Text>
      </XStack>
      <Separator vertical borderColor="$gray10" borderWidth={0.3} />
      <XStack alignItems="center" gap="$2">
        <CustomIcon name="star" size={15} color="$color5" />
        <Text color={'$black'} fontWeight="600" fontSize="$1">
          {/* الرياض - 12 كم */}
          {driver?.location?.country?.name}
        </Text>
      </XStack>
      <Separator vertical borderColor="$gray10" borderWidth={0.3} />
      <XStack alignItems="center" gap="$2">
        <CustomIcon name="star" size={15} color="$color5" />
        <Text color={'$black'} fontWeight="600" fontSize="$1">
          ({driver.rating_stats?.count}) {driver.rating_stats?.score}
        </Text>
      </XStack>

    </XStack>
  );
}


export default DriverStatsRow;
