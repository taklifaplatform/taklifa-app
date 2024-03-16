import React from 'react';
import { render } from '@testing-library/react-native';

import CompanyDashboardLayout from './company-dashboard-layout';

describe('CompanyDashboardLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< CompanyDashboardLayout />);
    expect(root).toBeTruthy();
  });
});
