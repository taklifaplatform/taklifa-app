import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentInteraction from './shipment-interaction';

describe('ShipmentInteraction', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentInteraction />);
    expect(root).toBeTruthy();
  });
});
