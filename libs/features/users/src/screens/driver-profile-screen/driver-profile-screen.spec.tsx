import React from 'react';
import { render } from '@testing-library/react-native';

import DriverProfileScreen from './driver-profile-screen';

describe('DriverProfileScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<DriverProfileScreen />);
    expect(root).toBeTruthy();
  });
});
