import React from 'react';
import { render } from '@testing-library/react-native';

import TextField from './text-field';

describe('TextField', () => {
  it('should render successfully', () => {
    const { root } = render(<TextField />);
    expect(root).toBeTruthy();
  });
});
