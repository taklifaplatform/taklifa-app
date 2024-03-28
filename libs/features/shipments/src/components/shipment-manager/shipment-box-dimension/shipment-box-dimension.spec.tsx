import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentBoxDimension from './shipment-box-dimension';

describe('ShipmentBoxDimension', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentBoxDimension />);
    expect(root).toBeTruthy();
  });
});
