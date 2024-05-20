import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentInvitationDetailScreen from './shipment-invitation-detail-screen';

describe('ShipmentInvitationDetailScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentInvitationDetailScreen />);
    expect(root).toBeTruthy();
  });
});
