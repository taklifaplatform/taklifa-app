import { DriverTransformer } from '@zix/api';

export type MapDriverMarkerProps = {
  driver: DriverTransformer;
  isSelected?: boolean;
  onPress?: () => void;
};

export const MapDriverMarker: React.FC<MapDriverMarkerProps> = ({
  driver,
  isSelected,
  onPress
}: MapDriverMarkerProps) => {

  return null;
}

export default MapDriverMarker;
