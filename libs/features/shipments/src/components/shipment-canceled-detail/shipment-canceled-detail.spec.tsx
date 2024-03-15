import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentCanceledDetail from './shipment-canceled-detail';

describe('ShipmentCanceledDetail', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentCanceledDetail />);
    expect(root).toBeTruthy();
  });
});
