import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';

import { Separator, Text, XStack } from 'tamagui';

export type UserInfoRowProps = {
  user: DriverTransformer;
};

export const UserInfoRow: React.FC<UserInfoRowProps> = ({ user }) => {
  return (
    <XStack justifyContent="space-between">
      <XStack alignItems="center" gap="$2">
        <CustomIcon name="car" size={15} color="$color5" />
        <Text color={'$black'} fontWeight="600" fontSize="$1">
          {user?.vehicle?.plate_number}
        </Text>
      </XStack>
      <Separator vertical borderColor="$gray10" borderWidth={0.3} />
      <XStack alignItems="center" gap="$2">
        <CustomIcon name="star" size={15} color="$color5" />
        <Text color={'$black'} fontWeight="600" fontSize="$1">
          {/* الرياض - 12 كم */}
          {user?.location?.country?.name}
        </Text>
      </XStack>
      <Separator vertical borderColor="$gray10" borderWidth={0.3} />
      <XStack alignItems="center" gap="$2">
        <CustomIcon name="star" size={15} color="$color5" />
        <Text color={'$black'} fontWeight="600" fontSize="$1">
          ({user.rating_stats?.count}) {user.rating_stats?.score}
        </Text>
      </XStack>
    </XStack>
  );
};

export default UserInfoRow;
