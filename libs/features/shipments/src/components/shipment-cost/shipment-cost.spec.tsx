import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentCost from './shipment-cost';

describe('ShipmentCost', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentCost />);
    expect(root).toBeTruthy();
  });
});
