import React from 'react';
import { render } from '@testing-library/react-native';

import UserProfileLayout from './user-profile-layout';

describe('UserProfileLayout', () => {
  it('should render successfully', () => {
    const { root } = render(<UserProfileLayout />);
    expect(root).toBeTruthy();
  });
});
