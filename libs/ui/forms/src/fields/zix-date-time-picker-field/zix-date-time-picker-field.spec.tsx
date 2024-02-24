import React from 'react';
import { render } from '@testing-library/react-native';

import ZixDateTimePickerField from './zix-date-time-picker-field';

describe('ZixDateTimePickerField', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixDateTimePickerField />);
    expect(root).toBeTruthy();
  });
});
