import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentProposalsOverviewCard from './shipment-proposals-overview-card';

describe('ShipmentProposalsOverviewCard', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentProposalsOverviewCard />);
    expect(root).toBeTruthy();
  });
});
