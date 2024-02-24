import React from 'react';
import { render } from '@testing-library/react-native';

import TimePickerField from './time-picker-field';

describe('TimePickerField', () => {
  it('should render successfully', () => {
    const { root } = render(<TimePickerField />);
    expect(root).toBeTruthy();
  });
});
