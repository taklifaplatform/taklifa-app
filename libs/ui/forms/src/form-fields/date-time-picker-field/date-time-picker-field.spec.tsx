import React from 'react';
import { render } from '@testing-library/react-native';

import DateTimePickerField from './date-time-picker-field';

describe('DateTimePickerField', () => {
  it('should render successfully', () => {
    const { root } = render(<DateTimePickerField />);
    expect(root).toBeTruthy();
  });
});
