import React from 'react';
import { render } from '@testing-library/react-native';

import DriversListScreen from './drivers-list-screen';

describe('DriversListScreen', () => {
  it('should render successfully', () => {
    const { root } = render(< DriversListScreen />);
    expect(root).toBeTruthy();
  });
});
