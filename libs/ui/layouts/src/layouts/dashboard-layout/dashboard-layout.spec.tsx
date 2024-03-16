import React from 'react';
import { render } from '@testing-library/react-native';

import DashboardLayout from './dashboard-layout';

describe('DashboardLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< DashboardLayout />);
    expect(root).toBeTruthy();
  });
});
