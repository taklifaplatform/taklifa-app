import React from 'react';
import { render } from '@testing-library/react-native';

import SummaryShipmentScreen from './summary-shipment-screen';

describe('SummaryShipmentScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< SummaryShipmentScreen />);
    expect(root).toBeTruthy();
  });
});
