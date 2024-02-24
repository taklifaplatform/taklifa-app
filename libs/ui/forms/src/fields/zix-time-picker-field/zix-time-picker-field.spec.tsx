import React from 'react';
import { render } from '@testing-library/react-native';

import ZixTimePickerField from './zix-time-picker-field';

describe('ZixTimePickerField', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixTimePickerField />);
    expect(root).toBeTruthy();
  });
});
