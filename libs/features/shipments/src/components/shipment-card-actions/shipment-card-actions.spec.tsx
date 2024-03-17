import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentCardActions from './shipment-card-actions';

describe('ShipmentCardActions', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentCardActions />);
    expect(root).toBeTruthy();
  });
});
