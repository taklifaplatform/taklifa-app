import React from 'react';
import { render } from '@testing-library/react-native';

import OrdersListScreen from './orders-list-screen';

describe('OrdersListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<OrdersListScreen />);
    expect(root).toBeTruthy();
  });
});
