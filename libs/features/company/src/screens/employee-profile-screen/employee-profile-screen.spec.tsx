import React from 'react';
import { render } from '@testing-library/react-native';

import EmployeeProfileScreen from './employee-profile-screen';

describe('EmployeeProfileScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< EmployeeProfileScreen />);
    expect(root).toBeTruthy();
  });
});
