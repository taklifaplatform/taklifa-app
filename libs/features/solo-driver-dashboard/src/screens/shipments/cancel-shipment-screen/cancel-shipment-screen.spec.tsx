import React from 'react';
import { render } from '@testing-library/react-native';

import CancelShipmentScreen from './cancel-shipment-screen';

describe('CancelShipmentScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< CancelShipmentScreen />);
    expect(root).toBeTruthy();
  });
});
