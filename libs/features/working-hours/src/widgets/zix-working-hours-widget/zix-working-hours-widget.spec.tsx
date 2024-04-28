import React from 'react';
import { render } from '@testing-library/react-native';

import ZixWorkingHoursWidget from './zix-working-hours-widget';

describe('ZixWorkingHoursWidget', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixWorkingHoursWidget workingHourId='' />);
    expect(root).toBeTruthy();
  });
});
