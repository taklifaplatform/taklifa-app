import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentActions from './shipment-actions';

describe('ShipmentActions', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentActions />);
    expect(root).toBeTruthy();
  });
});
