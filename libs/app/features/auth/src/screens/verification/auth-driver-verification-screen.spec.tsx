import React from 'react';
import { render } from '@testing-library/react-native';

import AuthDriverVerificationScreen from './auth-driver-verification-screen';

describe('AuthDriverVerificationScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< AuthDriverVerificationScreen />);
    expect(root).toBeTruthy();
  });
});
