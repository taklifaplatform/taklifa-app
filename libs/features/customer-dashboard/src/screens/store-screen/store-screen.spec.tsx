import React from 'react';
import { render } from '@testing-library/react-native';

import StoreScreen from './store-screen';

describe('StoreScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<StoreScreen />);
    expect(root).toBeTruthy();
  });
});
