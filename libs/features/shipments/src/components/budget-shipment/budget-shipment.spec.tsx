import React from 'react';
import { render } from '@testing-library/react-native';

import BudgetShipment from './budget-shipment';

describe('BudgetShipment', () => {
  it('should render successfully', () => {
    const { root } = render(< BudgetShipment />);
    expect(root).toBeTruthy();
  });
});
