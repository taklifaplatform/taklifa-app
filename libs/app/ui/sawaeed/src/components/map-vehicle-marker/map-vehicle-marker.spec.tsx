import React from 'react';
import { render } from '@testing-library/react-native';

import MapVehicleMarker from './map-vehicle-marker';

describe('MapVehicleMarker', () => {
  it('should render successfully', () => {
    const { root } = render(< MapVehicleMarker />);
    expect(root).toBeTruthy();
  });
});
