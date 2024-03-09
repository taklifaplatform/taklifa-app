import React from 'react';
import { render } from '@testing-library/react-native';

import DriverVehicleImagesRow from './driver-vehicle-images-row';

describe('DriverVehicleImagesRow', () => {
  it('should render successfully', () => {
    const { root } = render(< DriverVehicleImagesRow />);
    expect(root).toBeTruthy();
  });
});
