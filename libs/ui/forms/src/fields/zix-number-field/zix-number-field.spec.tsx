import React from 'react';
import { render } from '@testing-library/react-native';

import ZixNumberField from './zix-number-field';

describe('ZixNumberField', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixNumberField />);
    expect(root).toBeTruthy();
  });
});
