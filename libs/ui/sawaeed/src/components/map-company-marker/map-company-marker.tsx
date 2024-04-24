import { Building } from '@tamagui/lucide-icons';
import { CompanyTransformer } from '@zix/api';
import { Marker } from 'react-native-maps';

import { Image, View } from 'tamagui';


export type MapCompanyMarkerProps = {
  company: CompanyTransformer;
  isSelected?: boolean;
  onPress?: () => void;
};

export const MapCompanyMarker: React.FC<MapCompanyMarkerProps> = ({
  company,
  isSelected,
  onPress
}: MapCompanyMarkerProps) => {

  const renderCarIcon = () => company.logo?.original_url ? (
    <Image
      source={{ uri: company.logo.original_url }}
      width='100%'
      height='100%'
      resizeMode='contain'
    />
  ) : (
    <Building size="$4" />
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
}

export default MapCompanyMarker;
