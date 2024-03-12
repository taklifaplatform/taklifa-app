import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentCard from './shipment-card';

describe('ShipmentCard', () => {
  it('should render successfully', () => {
    const { root } = render(<ShipmentCard />);
    expect(root).toBeTruthy();
  });
});
