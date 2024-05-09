import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentInvitationsOverviewCard from './shipment-invitations-overview-card';

describe('ShipmentInvitationsOverviewCard', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentInvitationsOverviewCard />);
    expect(root).toBeTruthy();
  });
});
