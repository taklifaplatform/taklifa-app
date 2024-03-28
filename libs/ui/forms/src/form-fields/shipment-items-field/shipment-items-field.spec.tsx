import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentItemsField from './shipment-items-field';

describe('ShipmentItemsField', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentItemsField />);
    expect(root).toBeTruthy();
  });
});
