import React from 'react';
import { render } from '@testing-library/react-native';

import CreateShipmentScreen from './create-shipment-screen';

describe('CreateShipmentScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<CreateShipmentScreen />);
    expect(root).toBeTruthy();
  });
});
