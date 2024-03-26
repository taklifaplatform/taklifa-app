import React from 'react';
import { render } from '@testing-library/react-native';

import ManageShipmentRecipientScreen from './manage-shipment-recipient-screen';

describe('ManageShipmentRecipientScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<ManageShipmentRecipientScreen />);
    expect(root).toBeTruthy();
  });
});
