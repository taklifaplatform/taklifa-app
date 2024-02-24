import React from 'react';
import { render } from '@testing-library/react-native';

import CompaniesDashboardLayout from './companies-dashboard-layout';

describe('CompaniesDashboardLayout', () => {
  it('should render successfully', () => {
    const { root } = render(<CompaniesDashboardLayout />);
    expect(root).toBeTruthy();
  });
});
