import React from 'react';
import { render } from '@testing-library/react-native';

import OrderDetailsScreen from './order-details-screen';

describe('OrderDetailsScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< OrderDetailsScreen />);
    expect(root).toBeTruthy();
  });
});
