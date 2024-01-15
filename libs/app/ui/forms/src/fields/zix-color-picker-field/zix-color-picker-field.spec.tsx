import React from 'react';
import { render } from '@testing-library/react-native';

import ZixColorPickerField from './zix-color-picker-field';

describe('ZixColorPickerField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixColorPickerField />);
    expect(root).toBeTruthy();
  });
});
