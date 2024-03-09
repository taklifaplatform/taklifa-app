import React from 'react';
import { render } from '@testing-library/react-native';

import UserVehicleTab from './user-vehicle-tab';

describe('UserVehicleTab', () => {
  it('should render successfully', () => {
    const { root } = render(<UserVehicleTab />);
    expect(root).toBeTruthy();
  });
});
