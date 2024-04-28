import React from 'react';
import { render } from '@testing-library/react-native';

import WorkingHoursManagerScreen from './working-hours-manager-screen';

describe('WorkingHoursManagerScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< WorkingHoursManagerScreen />);
    expect(root).toBeTruthy();
  });
});
