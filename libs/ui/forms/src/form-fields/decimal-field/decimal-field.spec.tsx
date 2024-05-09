import React from 'react';
import { render } from '@testing-library/react-native';

import DecimalField from './decimal-field';

describe('FloatField', () => {
  it('should render successfully', () => {
    const { root } = render(<DecimalField />);
    expect(root).toBeTruthy();
  });
});
