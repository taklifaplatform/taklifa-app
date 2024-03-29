import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentSummaryScreen from './shipment-summary-screen';

describe('ShipmentSummaryScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<ShipmentSummaryScreen />);
    expect(root).toBeTruthy();
  });
});
