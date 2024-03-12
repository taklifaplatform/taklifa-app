import React from 'react';
import { render } from '@testing-library/react-native';

import SetRecipientShipmentScreen from './set-recipient-shipment-screen';

describe('SetRecipientShipmentScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<SetRecipientShipmentScreen />);
    expect(root).toBeTruthy();
  });
});
