import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentDetails from './shipment-details';

describe('ShipmentDetails', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentDetails />);
    expect(root).toBeTruthy();
  });
});
