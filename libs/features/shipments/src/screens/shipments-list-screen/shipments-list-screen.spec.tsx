import React from 'react';
import { render } from '@testing-library/react-native';

import ShipmentsListScreen from './shipments-list-screen';

describe('ShipmentsListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ShipmentsListScreen />);
    expect(root).toBeTruthy();
  });
});
