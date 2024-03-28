import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentManagerHeader from './shipment-manager-header';

describe('ShipmentManagerHeader', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentManagerHeader />);
    expect(root).toBeTruthy();
  });
});
