import React from 'react';
import { render } from '@testing-library/react-native';

import ResetPasswordScreen from './reset-password-screen';

describe('ResetPasswordScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< ResetPasswordScreen />);
    expect(root).toBeTruthy();
  });
});
