import React from 'react';
import { render } from '@testing-library/react-native';

import InviteEmployeeScreen from './invite-employee-screen';

describe('InviteEmployeeScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<InviteEmployeeScreen />);
    expect(root).toBeTruthy();
  });
});
