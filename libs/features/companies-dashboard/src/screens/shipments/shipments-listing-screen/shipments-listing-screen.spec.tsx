import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentsListingScreen from './shipments-listing-screen';

describe('ShipmentsListingScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentsListingScreen />);
    expect(root).toBeTruthy();
  });
});
