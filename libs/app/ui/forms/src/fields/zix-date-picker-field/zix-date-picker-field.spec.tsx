import React from 'react';
import { render } from '@testing-library/react-native';

import ZixDatePickerField from './zix-date-picker-field';

describe('ZixDatePickerField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixDatePickerField />);
    expect(root).toBeTruthy();
  });
});
