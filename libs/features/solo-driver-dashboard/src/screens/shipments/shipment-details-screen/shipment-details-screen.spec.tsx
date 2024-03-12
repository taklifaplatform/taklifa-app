import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentDetailsScreen from './shipment-details-screen';

describe('ShipmentDetailsScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentDetailsScreen />);
    expect(root).toBeTruthy();
  });
});
