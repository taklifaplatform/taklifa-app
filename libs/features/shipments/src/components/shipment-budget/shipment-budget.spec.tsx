import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentBudget from './shipment-budget';

describe('ShipmentBudget', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentBudget />);
    expect(root).toBeTruthy();
  });
});
