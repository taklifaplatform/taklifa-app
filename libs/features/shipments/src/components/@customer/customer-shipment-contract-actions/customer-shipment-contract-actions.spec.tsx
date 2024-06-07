import React from 'react';
import { render } from '@testing-library/react-native';

import CustomerShipmentContractActions from './customer-shipment-contract-actions';

describe('CustomerShipmentContractActions', () => {
  it('should render successfully', () => {
    const { root } = render(< CustomerShipmentContractActions />);
    expect(root).toBeTruthy();
  });
});
