import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import React from 'react';

import { Image, Separator, Text, Theme, ThemeableStackProps, useStyle, XStack, YStack } from 'tamagui';

export type UserInfoRowProps = ThemeableStackProps & {
  user: DriverTransformer;
};

export const UserInfoRow: React.FC<UserInfoRowProps> = ({
  user,
  ...props
}) => {

  const renderVehicleInfo = () => !!user?.vehicle?.model?.map_icon?.original_url && (
    <>
      <XStack alignItems="center" gap="$2">
        {
          !!user?.vehicle?.model?.map_icon?.original_url && (
            <Image
              source={{ uri: user?.vehicle?.model?.map_icon?.original_url }}
              style={vehicleIconStyle}
              contentFit='contain'
            />
          )
        }
        <Text color='$color12' fontWeight="700" fontSize="$1">
          {user?.vehicle?.model?.name}
        </Text>
        <Text color='$color12' fontWeight="600" fontSize="$1">
          ({user?.vehicle?.plate_number})
        </Text>
      </XStack>

      {
        hasLocation && (
          <Separator vertical borderColor="$color4" borderWidth={0.3} />
        )
      }
    </>
  )

  const hasLocation = !!(user?.location?.country?.name || user?.location?.city?.name || user?.location?.address)
  const renderLocationInfo = () => hasLocation && (
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

  const vehicleIconStyle = useStyle({
    width: user?.vehicle?.model?.map_icon_width || '$6',
    height: user?.vehicle?.model?.map_icon_height || '$4',
  })

  return (
    <XStack justifyContent="space-between" {...props}>
      {renderVehicleInfo()}
      {renderLocationInfo()}
      {renderRatingsInfo()}
    </XStack>
  );
};

export default UserInfoRow;
