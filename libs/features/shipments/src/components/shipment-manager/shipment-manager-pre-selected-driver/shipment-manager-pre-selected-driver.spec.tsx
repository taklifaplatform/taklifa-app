import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentManagerPreSelectedDriver from './shipment-manager-pre-selected-driver';

describe('ShipmentManagerPreSelectedDriver', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentManagerPreSelectedDriver />);
    expect(root).toBeTruthy();
  });
});
