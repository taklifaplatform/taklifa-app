import React from 'react';
import { render } from '@testing-library/react-native';

import UnauthorizedScreen from './unauthorized-screen';

describe('UnauthorizedScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< UnauthorizedScreen />);
    expect(root).toBeTruthy();
  });
});
