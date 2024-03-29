import React from 'react';
import { render } from '@testing-library/react-native';

import ManageShipmentItemsScreen from './manage-shipment-items-screen';

describe('ManageShipmentItemsScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<ManageShipmentItemsScreen />);
    expect(root).toBeTruthy();
  });
});
