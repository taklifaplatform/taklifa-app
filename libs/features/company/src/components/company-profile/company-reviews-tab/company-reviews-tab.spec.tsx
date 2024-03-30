import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyReviewsTab from './company-reviews-tab';

describe('CompanyReviewsTab', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyReviewsTab />);
    expect(root).toBeTruthy();
  });
});
