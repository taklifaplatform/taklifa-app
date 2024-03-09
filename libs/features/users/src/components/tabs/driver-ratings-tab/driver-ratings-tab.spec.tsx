import React from 'react';
import { render } from '@testing-library/react-native';

import DriverRatingsTab from './driver-ratings-tab';

describe('DriverRatingsTab', () => {
  it('should render successfully', () => {
    const { root } = render(<DriverRatingsTab />);
    expect(root).toBeTruthy();
  });
});
