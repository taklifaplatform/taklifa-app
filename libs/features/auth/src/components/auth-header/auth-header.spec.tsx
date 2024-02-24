import React from 'react';
import { render } from '@testing-library/react-native';

import AuthHeader from './auth-header';

describe('AuthHeader', () => {
  it('should render successfully', () => {
    const { root } = render(<AuthHeader />);
    expect(root).toBeTruthy();
  });
});
