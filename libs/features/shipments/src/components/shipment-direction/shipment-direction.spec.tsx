import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentDirection from './shipment-direction';

describe('ShipmentDirection', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentDirection />);
    expect(root).toBeTruthy();
  });
});
