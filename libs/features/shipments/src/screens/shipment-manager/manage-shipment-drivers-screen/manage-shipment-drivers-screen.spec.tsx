import React from 'react';
import { render } from '@testing-library/react-native';

import ManageShipmentDriversScreen from './manage-shipment-drivers-screen';

describe('ManageShipmentDriversScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<ManageShipmentDriversScreen />);
    expect(root).toBeTruthy();
  });
});
