import React from 'react';
import { render } from '@testing-library/react-native';

import ManageVehicleScreen from './manage-vehicle-screen';

describe('ManageVehicleScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<ManageVehicleScreen />);
    expect(root).toBeTruthy();
  });
});
