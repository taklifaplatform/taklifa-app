import React from 'react';
import { render } from '@testing-library/react-native';

import UserProfileScreen from './user-profile-screen';

describe('UserProfileScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< UserProfileScreen />);
    expect(root).toBeTruthy();
  });
});
