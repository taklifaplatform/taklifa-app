import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentInvitationsListScreen from './shipment-invitations-list-screen';

describe('ShipmentInvitationsListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentInvitationsListScreen />);
    expect(root).toBeTruthy();
  });
});
