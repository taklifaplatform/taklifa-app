import React from 'react';
import { render } from '@testing-library/react-native';

import UserProfile from './user-profile';

describe('UserProfile', () => {
  it('should render successfully', () => {
    const { root } = render(< UserProfile />);
    expect(root).toBeTruthy();
  });
});
