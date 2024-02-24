import React from 'react';
import { render } from '@testing-library/react-native';

import BooleanField from './boolean-field';

describe('BooleanField', () => {
  it('should render successfully', () => {
    const { root } = render(<BooleanField />);
    expect(root).toBeTruthy();
  });
});
