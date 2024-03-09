import React from 'react';
import { render } from '@testing-library/react-native';

import AboutDriverVehicleTab from './about-driver-vehicle-tab';

describe('AboutDriverVehicleTab', () => {
  it('should render successfully', () => {
    const { root } = render(<AboutDriverVehicleTab />);
    expect(root).toBeTruthy();
  });
});
