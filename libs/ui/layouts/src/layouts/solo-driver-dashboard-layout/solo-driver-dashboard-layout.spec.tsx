import React from 'react';
import { render } from '@testing-library/react-native';

import SoloDriverDashboardLayout from './solo-driver-dashboard-layout';

describe('SoloDriverDashboardLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< SoloDriverDashboardLayout />);
    expect(root).toBeTruthy();
  });
});
