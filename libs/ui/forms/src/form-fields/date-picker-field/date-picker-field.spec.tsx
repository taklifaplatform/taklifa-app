import React from 'react';
import { render } from '@testing-library/react-native';

import DatePickerField from './date-picker-field';

describe('DatePickerField', () => {
  it('should render successfully', () => {
    const { root } = render(<DatePickerField />);
    expect(root).toBeTruthy();
  });
});
