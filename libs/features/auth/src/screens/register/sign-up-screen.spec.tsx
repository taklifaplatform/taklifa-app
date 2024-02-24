import React from 'react';
import { render } from '@testing-library/react-native';

import SignUpScreen from './sign-up-screen';

describe('SignUpScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<SignUpScreen />);
    expect(root).toBeTruthy();
  });
});
