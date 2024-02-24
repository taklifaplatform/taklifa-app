import React from 'react';
import { render } from '@testing-library/react-native';

import MediaPickerField from './media-picker-field';

describe('MediaPickerField', () => {
  it('should render successfully', () => {
    const { root } = render(<MediaPickerField />);
    expect(root).toBeTruthy();
  });
});
