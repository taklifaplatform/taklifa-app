import { DriverTransformer } from '@zix/api';
import { CustomIcon } from '@zix/ui/icons';
import React, { useState } from 'react';
import { Platform } from 'react-native';
import { Marker } from 'react-native-maps';
import { Image, View } from 'tamagui';

export type MapDriverMarkerProps = {
  driver: DriverTransformer;
  isSelected?: boolean;
  onPress?: () => void;
};

export const MapDriverMarker: React.FC<MapDriverMarkerProps> = React.memo(({
  driver,
  isSelected,
  onPress
}: MapDriverMarkerProps) => {
  const [showCustomIcon, setShowCustomIcon] = useState(false)

  const renderCarIcon = () => (driver?.vehicle?.model?.map_icon?.url && !showCustomIcon) ? (
    <Image
      source={{ uri: driver.vehicle.model.map_icon.url }}
      width={driver.vehicle.model.map_icon_width || '$4'}
      height={driver.vehicle.model.map_icon_height || '$4'}
      onError={() => {
        setShowCustomIcon(true)
      }}
    />
  ) : (
    <CustomIcon name='solo_transporter_car' size={Platform.OS === 'web' ? "$8" : "$4"} />
  )

  const liveLocation = driver?.live_location || driver?.location;

  if (!liveLocation) {
    return null;
  }

  return (
    <Marker
      key={driver.id}
      coordinate={{
        latitude: parseFloat(liveLocation.latitude ?? '0'),
        longitude: parseFloat(liveLocation.longitude ?? '0'),
      }}
      onPress={() => onPress?.()}
    >
      <View
        width='$8'
        height='$8'
        alignItems='center'
        justifyContent='center'
        borderColor='$color5'
        cursor='pointer'
        style={
          isSelected
            ? {
                borderWidth: 1,
                borderColor: 'rgba(254, 202, 22, 0.1)',
                backgroundColor: 'rgba(254, 202, 22, 0.3)',
                borderRadius: 50,
              }
            : null
        }
      >
        {renderCarIcon()}
      </View>
    </Marker>
  );
}, (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected);

export default MapDriverMarker;
