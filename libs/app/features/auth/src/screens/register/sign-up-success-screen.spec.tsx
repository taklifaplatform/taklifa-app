import React from 'react';
import { render } from '@testing-library/react-native';

import SignUpSuccessScreen from './sign-up-success-screen';

describe('SignUpSuccessScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< SignUpSuccessScreen />);
    expect(root).toBeTruthy();
  });
});
