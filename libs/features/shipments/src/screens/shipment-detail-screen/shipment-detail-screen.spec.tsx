import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentDetailScreen from './shipment-detail-screen';

describe('ShipmentDetailScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentDetailScreen />);
    expect(root).toBeTruthy();
  });
});
