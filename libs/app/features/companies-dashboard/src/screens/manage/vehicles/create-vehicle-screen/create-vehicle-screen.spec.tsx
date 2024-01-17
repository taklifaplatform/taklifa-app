import React from 'react';
import { render } from '@testing-library/react-native';

import CreateVehicleScreen from './create-vehicle-screen';

describe('CreateVehicleScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< CreateVehicleScreen />);
    expect(root).toBeTruthy();
  });
});
