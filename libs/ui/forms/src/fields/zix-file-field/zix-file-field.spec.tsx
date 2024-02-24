import React from 'react';
import { render } from '@testing-library/react-native';

import ZixFileField from './zix-file-field';

describe('ZixFileField', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixFileField />);
    expect(root).toBeTruthy();
  });
});
