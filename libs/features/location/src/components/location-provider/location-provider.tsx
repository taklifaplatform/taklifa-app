
import React, { useState } from 'react';

import { LocationService, LocationTransformer } from '@zix/api';
import { LocationManagerContext } from '@zix/services/location';
import LocationManagerSheet from '../location-manager-sheet/location-manager-sheet';

/* eslint-disable-next-line */
export interface LocationProviderProps {
  children: React.ReactNode;
}


export const LocationProvider: React.FC<LocationProviderProps> = ({
  children
}) => {
  const [location, setLocation] = useState<LocationTransformer>()
  const [locationEditorVisible, setLocationEditorVisible] = useState(false)
  async function editLocation(locationId?: string) {
    setLocationEditorVisible(true);
    if (locationId) {
      const result = await LocationService.retrieve({
        location: locationId,
      })
      setLocation(result.data);
      return result.data;
    } else {
      const result = await LocationService.create({
        requestBody: {},
      })
      setLocation(result.data);
      return result.data;
    }
    // do nothing
  }

  async function onCloseLocationEditor() {
    setLocationEditorVisible(false);
    setLocation(undefined);
    // do nothing
  }
  return (
    <LocationManagerContext.Provider value={{
      location,
      locationEditorVisible,
      editLocation,
      onCloseLocationEditor,
    }}>
      {children}
      <LocationManagerSheet />
    </LocationManagerContext.Provider>
  );
}


export default LocationProvider;
