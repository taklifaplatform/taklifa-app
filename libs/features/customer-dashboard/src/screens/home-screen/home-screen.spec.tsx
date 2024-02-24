import React from 'react';
import { render } from '@testing-library/react-native';

import HomeScreen from './home-screen';

describe('HomeScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<HomeScreen />);
    expect(root).toBeTruthy();
  });
});
