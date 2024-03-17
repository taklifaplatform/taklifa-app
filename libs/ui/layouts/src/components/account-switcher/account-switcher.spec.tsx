import React from 'react';
import { render } from '@testing-library/react-native';

import DashboardSwitcher from './account-switcher';

describe('DashboardSwitcher', () => {
  it('should render successfully', () => {
    const { root } = render(<DashboardSwitcher />);
    expect(root).toBeTruthy();
  });
});
