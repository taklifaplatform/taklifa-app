import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentCardLocation from './shipment-card-location';

describe('ShipmentCardLocation', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentCardLocation />);
    expect(root).toBeTruthy();
  });
});
