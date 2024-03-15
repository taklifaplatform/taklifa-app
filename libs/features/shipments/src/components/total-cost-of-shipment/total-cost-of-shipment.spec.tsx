import React from 'react';
import { render } from '@testing-library/react-native';

import TotalCostOfShipment from './total-cost-of-shipment';

describe('TotalCostOfShipment', () => {
  it('should render successfully', () => {
    const { root } = render(< TotalCostOfShipment />);
    expect(root).toBeTruthy();
  });
});
