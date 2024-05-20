import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentProposalsListScreen from './shipment-proposals-list-screen';

describe('ShipmentProposalsListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentProposalsListScreen />);
    expect(root).toBeTruthy();
  });
});
