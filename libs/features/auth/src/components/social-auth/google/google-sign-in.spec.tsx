import React from 'react';
import { render } from '@testing-library/react-native';

import GoogleSignIn from './google-sign-in';

describe('GoogleSignIn', () => {
  it('should render successfully', () => {
    const { root } = render(<GoogleSignIn />);
    expect(root).toBeTruthy();
  });
});
