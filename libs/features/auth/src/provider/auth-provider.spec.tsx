import React from 'react';
import { render } from '@testing-library/react-native';

import AuthProvider from './auth-provider';

describe('AuthProvider', () => {
  it('should render successfully', () => {
    const { root } = render(< AuthProvider />);
    expect(root).toBeTruthy();
  });
});
