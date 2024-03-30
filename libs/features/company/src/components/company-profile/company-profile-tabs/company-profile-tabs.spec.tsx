import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyProfileTabs from './company-profile-tabs';

describe('CompanyProfileTabs', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyProfileTabs />);
    expect(root).toBeTruthy();
  });
});
