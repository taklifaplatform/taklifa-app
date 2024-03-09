import React from 'react';
import { render } from '@testing-library/react-native';

import ProfileTabs from './profile-tabs';

describe('ProfileTabs', () => {
  it('should render successfully', () => {
    const { root } = render(<ProfileTabs />);
    expect(root).toBeTruthy();
  });
});
