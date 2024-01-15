import React from 'react';
import { render } from '@testing-library/react-native';

import CodeInputField from './code-input-field';

describe('CodeInputField', () => {
  it('should render successfully', () => {
    const { root } = render(< CodeInputField />);
    expect(root).toBeTruthy();
  });
});
