import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentDeliveringDetail from './shipment-delivering-detail';

describe('ShipmentDeliveringDetail', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentDeliveringDetail />);
    expect(root).toBeTruthy();
  });
});
