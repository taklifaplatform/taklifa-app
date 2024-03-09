import React from 'react';
import { render } from '@testing-library/react-native';

import UserRatingsTab from './user-ratings-tab';

describe('UserRatingsTab', () => {
  it('should render successfully', () => {
    const { root } = render(<UserRatingsTab />);
    expect(root).toBeTruthy();
  });
});
