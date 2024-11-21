import { LocationTransformer } from '@zix/api';
import { createContext, useContext } from 'react';
import { Alert } from 'react-native';

/**
 * The location contest will help:
 * - editing location by id or creating new one
 * - if the user logged in create an interval to update the user location each 1 min
 *
 */
export const LocationManagerContext = createContext<{
  location?: LocationTransformer;
  locationEditorVisible?: boolean;
  editLocation: (location_id?: string) => void;
  onCloseLocationEditor: () => void;
}>({
  editLocation: () => {
    // do nothing
    Alert.alert('LocationManagerContext', 'editLocation not implemented');
  },
  onCloseLocationEditor: () => {
    // do nothing
    Alert.alert(
      'LocationManagerContext',
      'onCloseLocationEditor not implemented',
    );
  },
});

export const useLocationManager = () => useContext(LocationManagerContext);
