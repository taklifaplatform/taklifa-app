import React from 'react';
import { render } from '@testing-library/react-native';

import { ShipmentCardHeader } from './shipment-card-header';

describe('ShipmentCardHeader', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentCardHeader shipment={{}} />);
    expect(root).toBeTruthy();
  });
});
