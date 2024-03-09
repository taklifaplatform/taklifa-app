import React from 'react';
import { render } from '@testing-library/react-native';

import DriverCard from './driver-card';

describe('DriverCard', () => {
  it('should render successfully', () => {
    const { root } = render(< DriverCard />);
    expect(root).toBeTruthy();
  });
});
