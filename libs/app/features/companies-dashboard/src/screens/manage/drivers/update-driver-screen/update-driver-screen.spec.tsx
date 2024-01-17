import React from 'react';
import { render } from '@testing-library/react-native';

import UpdateDriverScreen from './update-driver-screen';

describe('UpdateDriverScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< UpdateDriverScreen />);
    expect(root).toBeTruthy();
  });
});
