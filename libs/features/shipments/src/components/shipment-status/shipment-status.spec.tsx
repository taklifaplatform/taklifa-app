import React from 'react';
import { render } from '@testing-library/react-native';

import { ShipmentStatus } from './shipment-status';

describe('ShipmentStatus', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentStatus shipment={{}} />);
    expect(root).toBeTruthy();
  });
});
