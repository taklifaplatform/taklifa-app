import React from 'react';
import { render } from '@testing-library/react-native';

import { ManageShipmentSenderScreen } from './manage-shipment-sender-screen';

describe('ManageShipmentSenderScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<ManageShipmentSenderScreen />);
    expect(root).toBeTruthy();
  });
});
