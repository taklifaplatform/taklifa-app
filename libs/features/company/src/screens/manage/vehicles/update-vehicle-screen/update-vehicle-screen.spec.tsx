import React from 'react';
import { render } from '@testing-library/react-native';

import UpdateVehicleScreen from './update-vehicle-screen';

describe('UpdateVehicleScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<UpdateVehicleScreen />);
    expect(root).toBeTruthy();
  });
});
