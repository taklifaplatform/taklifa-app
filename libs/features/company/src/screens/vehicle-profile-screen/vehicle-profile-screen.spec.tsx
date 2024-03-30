import React from 'react';
import { render } from '@testing-library/react-native';

import VehicleProfileScreen from './vehicle-profile-screen';

describe('VehicleProfileScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< VehicleProfileScreen />);
    expect(root).toBeTruthy();
  });
});
