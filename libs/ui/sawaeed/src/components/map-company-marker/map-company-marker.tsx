import { Building } from '@tamagui/lucide-icons';
import { CompanyTransformer } from '@zix/api';
import React, { useState } from 'react';
import { Marker } from 'react-native-maps';
import { Image } from 'expo-image';

import { Theme, useStyle, View } from 'tamagui';
import { Platform } from 'react-native';
import { CustomIcon } from '@zix/ui/icons';


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


  const style = useStyle({
    width: '$4',
    height: '$4',
    borderRadius: '$4',
  })
  // const renderCarIcon = () => (company?.logo?.original_url && !showCustomIcon) ? (
  //   <Image
  //     source={{ uri: company.logo?.original_url }}
  //     style={style}
  //     resizeMode='contain'
  //     onError={() => {
  //       setShowCustomIcon(true)
  //     }}
  //   />
  // ) : (
  //   <CustomIcon name='company_cars' size="$4" color={'$color5'} />
  // )
  const renderCarIcon = () => (
    <Theme name='accent'>
      <CustomIcon name='logo' size="$4" color='$color1' />
    </Theme>
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
        height='$8'
        alignItems={Platform.OS === 'android' ? undefined : 'center'}
        justifyContent={Platform.OS === 'android' ? undefined : 'center'}
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
