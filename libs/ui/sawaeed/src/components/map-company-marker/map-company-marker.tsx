import { CompanyBranchTransformer, CompanyTransformer } from '@zix/api';
import { Image } from 'expo-image';
import React, { useState } from 'react';
import { Marker } from 'react-native-maps';

import { CustomIcon } from '@zix/ui/icons';
import { Platform } from 'react-native';
import { useStyle, View } from 'tamagui';


export type MapCompanyMarkerProps = {
  company: CompanyTransformer;
  branch?: CompanyBranchTransformer;
  isSelected?: boolean;
  onPress?: () => void;
};

export const MapCompanyMarker: React.FC<MapCompanyMarkerProps> = React.memo(({
  company,
  branch,
  isSelected,
  onPress
}: MapCompanyMarkerProps) => {
  const [showCustomIcon, setShowCustomIcon] = useState(false)


  const style = useStyle({
    width: '$2',
    height: '$2',
    borderRadius: '$4',
  })
  const renderCompanyLogo = () => (company?.logo?.original_url && !showCustomIcon) ? (
    <Image
      source={{ uri: company.logo?.original_url }}
      style={style}
      resizeMode='contain'
      onError={() => {
        setShowCustomIcon(true)
      }}
    />
  ) : (
    <View theme='accent' style={style} backgroundColor='$color1'>
      <CustomIcon name='logo_light' size="$1" color='$color1' />
    </View>
  )
  // const renderCompanyLogo = () => (
  //   <View theme='accent' backgroundColor='$color1' borderRadius='$4' width='$4' height='$4'>
  //     <CustomIcon name='logo' size="$4" color='$color1' />
  //   </View>
  // )

  const location = (branch?.location?.latitude && branch?.location?.longitude) ? branch?.location : company.location

  if (!location) {
    return null;
  }


  // return <Marker
  //   key={company.id}
  //   coordinate={{
  //     latitude: parseFloat(location.latitude ?? '0'),
  //     longitude: parseFloat(location.longitude ?? '0'),
  //   }}
  //   onPress={() => onPress?.()}
  // />

  return (
    <Marker
      key={company.id}
      coordinate={{
        latitude: parseFloat(location.latitude ?? '0'),
        longitude: parseFloat(location.longitude ?? '0'),
      }}
      onPress={() => onPress?.()}
    >
      <View
        width='$2'
        height='$2'
        borderRadius='$8'
        backgroundColor='$color1'
        overflow='hidden'
        alignItems={Platform.OS === 'android' ? undefined : 'center'}
        justifyContent={Platform.OS === 'android' ? undefined : 'center'}
        borderColor='$color5'
      >
        {renderCompanyLogo()}
      </View>
    </Marker>
  );
},
  (prevProps, nextProps) => prevProps.isSelected === nextProps.isSelected
);

export default MapCompanyMarker;
