import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentOwnerActions from './shipment-owner-actions';

describe('ShipmentOwnerActions', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentOwnerActions />);
    expect(root).toBeTruthy();
  });
});
