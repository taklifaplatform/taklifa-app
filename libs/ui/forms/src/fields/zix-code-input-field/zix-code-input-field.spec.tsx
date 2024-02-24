import React from 'react';
import { render } from '@testing-library/react-native';

import ZixCodeInputField from './zix-code-input-field';

describe('ZixCodeInputField', () => {
  it('should render successfully', () => {
    const { root } = render(<ZixCodeInputField />);
    expect(root).toBeTruthy();
  });
});
