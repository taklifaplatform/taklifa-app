import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentInformation from './shipment-information';

describe('ShipmentInformation', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentInformation />);
    expect(root).toBeTruthy();
  });
});
