import React from 'react';
import { render } from '@testing-library/react-native';

import AuthLayout from './auth-layout';

describe('AuthLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< AuthLayout />);
    expect(root).toBeTruthy();
  });
});
