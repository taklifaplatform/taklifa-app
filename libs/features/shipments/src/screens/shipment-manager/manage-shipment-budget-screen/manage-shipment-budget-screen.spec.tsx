import React from 'react';
import { render } from '@testing-library/react-native';

import ManageShipmentBudgetScreen from './manage-shipment-budget-screen';

describe('ManageShipmentBudgetScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<ManageShipmentBudgetScreen />);
    expect(root).toBeTruthy();
  });
});
