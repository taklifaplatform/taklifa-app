import React from 'react';
import { render } from '@testing-library/react-native';

import DriverProfileLayout from './driver-profile-layout';

describe('DriverProfileLayout', () => {
  it('should render successfully', () => {
    const { root } = render(< DriverProfileLayout />);
    expect(root).toBeTruthy();
  });
});
