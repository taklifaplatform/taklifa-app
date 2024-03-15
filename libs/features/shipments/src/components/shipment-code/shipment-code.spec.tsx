import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentCode from './shipment-code';

describe('ShipmentCode', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentCode />);
    expect(root).toBeTruthy();
  });
});
