import React from 'react';
import { render } from '@testing-library/react-native';

import AppleSignIn from './apple-sign-in';

describe('AppleSignIn', () => {
  it('should render successfully', () => {
    const { root } = render(<AppleSignIn />);
    expect(root).toBeTruthy();
  });
});
