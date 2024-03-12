import React from 'react';
import { render } from '@testing-library/react-native';

import AddItemsShipmentScreen from './add-items-shipment-screen';

describe('AddItemsShipmentScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<AddItemsShipmentScreen />);
    expect(root).toBeTruthy();
  });
});
