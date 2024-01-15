import React from 'react';
import { render } from '@testing-library/react-native';

import ZixMediaPickerField from './zix-media-picker-field';

describe('ZixMediaPickerField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixMediaPickerField />);
    expect(root).toBeTruthy();
  });
});
