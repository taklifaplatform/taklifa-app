import React from 'react';
import { render } from '@testing-library/react-native';

import AccountDashboardLayout from './account-dashboard-layout';

describe('AccountDashboardLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< AccountDashboardLayout />);
    expect(root).toBeTruthy();
  });
});
