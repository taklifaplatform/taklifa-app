import React from 'react';
import { render } from '@testing-library/react-native';

import AcceptShipmentInvitationScreen from './accept-shipment-invitation-screen';

describe('AcceptShipmentInvitationScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< AcceptShipmentInvitationScreen />);
    expect(root).toBeTruthy();
  });
});
