import React from 'react';
import { render } from '@testing-library/react-native';

import DriverStatsRow from './driver-stats-row';

describe('DriverStatsRow', () => {
  it('should render successfully', () => {
    const { root } = render(<DriverStatsRow />);
    expect(root).toBeTruthy();
  });
});
