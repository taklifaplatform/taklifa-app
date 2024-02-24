import React from 'react';
import { render } from '@testing-library/react-native';

import FacebookSignIn from './facebook-sign-in';

describe('FacebookSignIn', () => {
  it('should render successfully', () => {
    const { root } = render(<FacebookSignIn />);
    expect(root).toBeTruthy();
  });
});
