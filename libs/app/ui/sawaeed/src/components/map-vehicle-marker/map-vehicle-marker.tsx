import { ZixMap } from '@zix/app/ui/common';
import { CustomIcon } from '@zix/app/ui/icons';
import { View } from 'tamagui';

export type IMarker = {
  vehicle_type: string;
  rotateDegree?: string;
  coordinate: any;
  id: number;
  setSelectedMarkerIndex?: (index: number) => void;
};

export type MapVehicleMarkerProps = {
  index: number;
  setSelectedMarker: (marker: IMarker) => void;
  marker: IMarker;
  selectedMarker: IMarker;
  setShowModal: (show: boolean) => void;
  setSelectedMarkerIndex?: (index: number) => void;
};

export function MapVehicleMarker({ marker, index , setSelectedMarker, selectedMarker, setShowModal, setSelectedMarkerIndex}: MapVehicleMarkerProps) {
  
  const onMarkerPress = () => {
    setSelectedMarker(marker);
    setShowModal(true);
    setSelectedMarkerIndex && setSelectedMarkerIndex(index);
  }
  
  return (
    <ZixMap.Marker 
    key={index} 
    coordinate={marker.coordinate} 
    onPress={() => onMarkerPress}>
      <View
        // rotate vehicle icon based on its direction
        style={marker?.id === selectedMarker?.id ? {
          borderWidth: 10,
          borderColor: 'rgba(254, 202, 22, 0.1)',
          backgroundColor: 'rgba(254, 202, 22, 0.3)',
          borderRadius: 50,
          padding: 7,
         /* transform: [
            {
              rotate: marker.rotateDegree || '0deg'
            }
          ]*/
        } : null}
      >
        <CustomIcon name={marker.vehicle_type} size="$4" />
      </View>
    </ZixMap.Marker>
  );
}

export default MapVehicleMarker;
