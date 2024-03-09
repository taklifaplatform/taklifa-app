import React from 'react';
import { render } from '@testing-library/react-native';

import UserReviewsTab from './user-reviews-tab';

describe('UserReviewsTab', () => {
  it('should render successfully', () => {
    const { root } = render(<UserReviewsTab />);
    expect(root).toBeTruthy();
  });
});
