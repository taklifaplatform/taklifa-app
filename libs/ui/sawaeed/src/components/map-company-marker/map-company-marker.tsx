import { Building } from '@tamagui/lucide-icons';
import { CompanyTransformer } from '@zix/api';
import React, { useState } from 'react';
import { Marker } from 'react-native-maps';

import { Image, View } from 'tamagui';


export type MapCompanyMarkerProps = {
  company: CompanyTransformer;
  isSelected?: boolean;
  onPress?: () => void;
};

export const MapCompanyMarker: React.FC<MapCompanyMarkerProps> = React.memo(({
  company,
  isSelected,
  onPress
}: MapCompanyMarkerProps) => {
  const [showCustomIcon, setShowCustomIcon] = useState(false)

  const renderCarIcon = () =>  (company?.logo?.original_url && !showCustomIcon) ? (
    <Image
      source={{ uri: company.logo?.original_url }}
      width={50}
      height={50}
      borderRadius={100}
      resizeMode='contain'
      onError={() => {
        setShowCustomIcon(true)
      }}
    />
  ) : (
    <Building size="$2" color={'$color5'}/>
  )

  if (!company.location) {
    return null;
  }

  return (
    <Marker
      key={company.id}
      coordinate={{
        latitude: parseFloat(company.location.latitude ?? '0'),
        longitude: parseFloat(company.location.longitude ?? '0'),
      }}
      onPress={() => onPress?.()}
    >
      <View
        width='$8'
        height='$5'
        alignItems='center'
        justifyContent='center'
        borderColor='$color5'
      >
        {renderCarIcon()}
      </View>
    </Marker>
  );
},
(prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected
);

export default MapCompanyMarker;
