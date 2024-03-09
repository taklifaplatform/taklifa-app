import React from 'react';
import { render } from '@testing-library/react-native';

import ProfileHeader from './profile-header';

describe('ProfileHeader', () => {
  it('should render successfully', () => {
    const { root } = render(< ProfileHeader />);
    expect(root).toBeTruthy();
  });
});
