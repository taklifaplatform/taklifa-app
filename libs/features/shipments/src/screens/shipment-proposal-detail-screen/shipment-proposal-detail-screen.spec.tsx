import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentProposalDetailScreen from './shipment-proposal-detail-screen';

describe('ShipmentProposalDetailScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentProposalDetailScreen />);
    expect(root).toBeTruthy();
  });
});
