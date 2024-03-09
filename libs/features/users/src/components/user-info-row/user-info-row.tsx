import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';

import { Separator, Text, ThemeableStackProps, XStack } from 'tamagui';

export type UserInfoRowProps = ThemeableStackProps & {
  user: DriverTransformer;
};

export const UserInfoRow: React.FC<UserInfoRowProps> = ({
  user,
  ...props
}) => {

  const renderVehicleInfo = () => !!user?.vehicle && (
    <>
      <XStack alignItems="center" gap="$2">
        <CustomIcon name="car" size={15} color="$color5" />
        <Text color={'$black'} fontWeight="600" fontSize="$1">
          {user?.vehicle?.plate_number}
        </Text>
      </XStack>

      {
        !!user?.location?.id && (
          <Separator vertical borderColor="$gray10" borderWidth={0.3} />
        )
      }
    </>
  )

  const renderLocationInfo = () => !!user?.location?.id && (
    <>
      <XStack alignItems="center" gap="$2">
        <CustomIcon name="star" size={15} color="$color5" />
        <Text color={'$black'} fontWeight="600" fontSize="$1">
          {user?.location?.country?.name}
        </Text>
      </XStack>
      {
        !!user.rating_stats?.count && (
          <Separator vertical borderColor="$gray10" borderWidth={0.3} />
        )
      }
    </>
  )

  const renderRatingsInfo = () => !!user.rating_stats?.count && (
    <XStack alignItems="center" gap="$2">
      <CustomIcon name="star" size={15} color="$color5" />
      <Text color={'$black'} fontWeight="600" fontSize="$1">
        ({user.rating_stats?.count}) {user.rating_stats?.score}
      </Text>
    </XStack>
  )

  return (
    <XStack justifyContent="space-between" {...props}>
      {renderVehicleInfo()}
      {renderLocationInfo()}
      {renderRatingsInfo()}
    </XStack>
  );
};

export default UserInfoRow;
