import React from 'react';
import { render } from '@testing-library/react-native';

import OrdersScreen from './orders-screen';

describe('OrdersScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< OrdersScreen />);
    expect(root).toBeTruthy();
  });
});
