import React from 'react';
import { render } from '@testing-library/react-native';

import ChangePasswordScreen from './change-password-screen';

describe('ChangePasswordScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<ChangePasswordScreen />);
    expect(root).toBeTruthy();
  });
});
