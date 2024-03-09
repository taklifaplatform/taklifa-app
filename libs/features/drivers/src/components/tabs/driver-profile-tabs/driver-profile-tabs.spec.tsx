import React from 'react';
import { render } from '@testing-library/react-native';

import DriverProfileTabs from './driver-profile-tabs';

describe('DriverProfileTabs', () => {
  it('should render successfully', () => {
    const { root } = render(< DriverProfileTabs />);
    expect(root).toBeTruthy();
  });
});
