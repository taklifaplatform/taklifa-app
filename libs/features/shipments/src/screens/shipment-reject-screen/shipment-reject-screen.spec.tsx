import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentRejectScreen from './shipment-reject-screen';

describe('ShipmentRejectScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentRejectScreen />);
    expect(root).toBeTruthy();
  });
});
