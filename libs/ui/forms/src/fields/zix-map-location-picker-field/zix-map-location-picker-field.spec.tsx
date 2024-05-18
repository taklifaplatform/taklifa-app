import React from 'react';
import { render } from '@testing-library/react-native';

import ZixMapLocationPickerField from './zix-map-location-picker-field';

describe('ZixMapLocationPickerField', () => {
  it('should render successfully', () => {
    const { root } = render(< ZixMapLocationPickerField />);
    expect(root).toBeTruthy();
  });
});
