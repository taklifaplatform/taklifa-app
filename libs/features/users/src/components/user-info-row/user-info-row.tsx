import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';

import { Image, Separator, Text, Theme, ThemeableStackProps, XStack } from 'tamagui';

export type UserInfoRowProps = ThemeableStackProps & {
  user: DriverTransformer;
};

export const UserInfoRow: React.FC<UserInfoRowProps> = ({
  user,
  ...props
}) => {

  const renderVehicleInfo = () => !!user?.vehicle?.plate_number && (
    <>
      <XStack alignItems="center" gap="$2">
        <Theme name='accent'>
          <CustomIcon name="car" size='$1' color="$color9" />
        </Theme>
        <Text color='$color12' fontWeight="600" fontSize="$1">
          {user?.vehicle?.plate_number}
        </Text>
      </XStack>

      {
        !!user?.location?.id && (
          <Separator vertical borderColor="$color4" borderWidth={0.3} />
        )
      }
    </>
  )

  const renderLocationInfo = () => !!user?.location?.id && (
    <>
      <XStack alignItems="center" gap="$2">
        <Theme name='accent'>
          <CustomIcon name="location" size='$1' color="$color9" />
        </Theme>
        <Text color='$color12' fontWeight="600" fontSize="$1">
          {user?.location?.country?.name || user?.location?.city?.name || user?.location?.address?.substring(0, 10)}
        </Text>
      </XStack>
      {
        !!user.rating_stats?.count && (
          <Separator vertical borderColor="$color4" borderWidth={0.3} />
        )
      }
    </>
  )

  const renderRatingsInfo = () => !!user.rating_stats?.count && (
    <XStack alignItems="center" gap="$2">
      <Theme name='accent'>
        <CustomIcon name="star" size='$1' color="$color9" />
      </Theme>
      <Text color='$color12' fontWeight="600" fontSize="$1">
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
