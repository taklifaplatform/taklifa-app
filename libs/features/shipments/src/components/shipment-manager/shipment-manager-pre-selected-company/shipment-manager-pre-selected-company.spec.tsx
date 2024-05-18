import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentManagerPreSelectedCompany from './shipment-manager-pre-selected-company';

describe('ShipmentManagerPreSelectedCompany', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentManagerPreSelectedCompany />);
    expect(root).toBeTruthy();
  });
});
