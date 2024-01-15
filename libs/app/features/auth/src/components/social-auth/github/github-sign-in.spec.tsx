import React from 'react';
import { render } from '@testing-library/react-native';

import GithubSignIn from './github-sign-in';

describe('GithubSignIn', () => {
  it('should render successfully', () => {
    const { root } = render(< GithubSignIn />);
    expect(root).toBeTruthy();
  });
});
