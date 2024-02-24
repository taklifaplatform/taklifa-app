import React from 'react';
import { render } from '@testing-library/react-native';

import ColorPickerField from './color-picker-field';

describe('ColorPickerField', () => {
  it('should render successfully', () => {
    const { root } = render(<ColorPickerField />);
    expect(root).toBeTruthy();
  });
});
