import React from 'react';
import { render } from '@testing-library/react-native';

import CustomerDashboardLayout from './customer-dashboard-layout';

describe('CustomerDashboardLayout', () => {
  it('should render successfully', () => {
    const { root } = render(<CustomerDashboardLayout />);
    expect(root).toBeTruthy();
  });
});
