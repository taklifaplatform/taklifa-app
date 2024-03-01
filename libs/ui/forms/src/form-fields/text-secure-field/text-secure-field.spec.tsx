import React from 'react';
import { render } from '@testing-library/react-native';

import TextSecureField from './text-secure-field';

describe('TextSecureField', () => {
  it('should render successfully', () => {
    const { root } = render(<TextSecureField />);
    expect(root).toBeTruthy();
  });
});
