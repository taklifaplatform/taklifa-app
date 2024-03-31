import React from 'react';
import { render } from '@testing-library/react-native';

import EmployeesListScreen from './employees-list-screen';

describe('EmployeesListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(<EmployeesListScreen />);
    expect(root).toBeTruthy();
  });
});
